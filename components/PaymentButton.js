import { View, Text, TouchableOpacity } from "react-native";
import tw, { create } from 'twrnc';
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { stripeKey, fetchPaymentSheetParams, createReceipt } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { selectStripeId, selectClient } from "../slices/userData";
import { setNameBluetooth, setConnected } from '../slices/bluetoothData';

const PaymentButton = ({total,products,navigation}) => {
  
  const dispatch = useDispatch();

  const client = useSelector(selectClient)

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const stripeId = useSelector(selectStripeId)

  const initializePaymentSheet = async () => {
    try {
      const userDT = await AsyncStorage.getItem('user')
      if(userDT !== null) {
          let userData = JSON.parse(userDT)
          fetchPaymentSheetParams(stripeId, total, userData.userToken)
          .then((data) => {
              initPaymentSheet({
              merchantDisplayName: "Store to Go",
              customerId: data.customer,
              paymentIntentClientSecret: data.client_secret,
              defaultBillingDetails: {
                  address: {
                  country: "EC",
                  },
              },
              });
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
        console.log(error)
    }
  };

  const creaReceipt = async () => {
    let receiptDetail = products.map(d => {
      return {
        quantity: d.quantity,
        price: d.itemPrice,
        stockId: d.id
      }
    })
    try {
      const userDT = await AsyncStorage.getItem('user')
      if(userDT !== null) {
          let userData = JSON.parse(userDT)
          const payload = {
            clientId: client.id,
            receiptDetails: receiptDetail
          }
          let response = await createReceipt(userData.userToken,payload)
      }
  } catch (error) {
      console.log(error)
  }
  }

  const openPaymentSheet = async () => {
    presentPaymentSheet({clientSecret:stripeKey}).then(data => {
      creaReceipt()
      dispatch(setNameBluetooth(null))
      dispatch(setConnected(false))
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Recibos'
          },
        ],
      })
    });
  };

  React.useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey={stripeKey}>
      <View>
        <TouchableOpacity style={tw`bg-green-300 m-4 p-4 rounded-2`} onPress={()=> openPaymentSheet()}>
            <Text style={tw`text-center text-white font-bold text-lg`}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

export default PaymentButton;
