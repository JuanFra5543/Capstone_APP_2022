import { Platform, View, SafeAreaView, TouchableOpacity, FlatList, Text, PermissionsAndroid } from 'react-native'
import tw from 'twrnc';
import React from "react";
import { Icon } from 'react-native-elements';

import { useSelector, useDispatch } from "react-redux";
import { setName, setPhone, setMail, setPassword, setStripeId } from '../slices/userData';
import { selectNameBluetooth, selectConnected, selectMessage } from '../slices/bluetoothData';

import twr from '../helpers/tailwind'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUser, getProduct } from '../api';
import DrawerBarButton from '../components/DrawerBarButton';
import ItemContainer from '../components/ItemContainer';

const HomeScreen = ({navigation}) => {

  const [isFetching, setIsFetching] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [total, setTotal] = React.useState(0);

  const [data,setData] = React.useState([])

  const dispatch = useDispatch();

  const bName = useSelector(selectNameBluetooth)
  const bConnected = useSelector(selectConnected)
  const [flag, setFlag] = React.useState('')
  let code = useSelector(selectMessage)

  const requestBluetoothPermision = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title:"Store to go Permission",
                message:"Store to go needs access to your location " + "so you can use the app correctly.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("ok fine location");
        } else {
          console.log("Camera permission denied");
        }
        const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
                title:"Store to go Permission",
                message:"Store to go needs access to your location " + "so you can use the app correctly.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Ok coarse location");
        } else {
          console.log("Bluetootj permission denied");
        }
    } catch (err) {
      console.warn(err);
    }
    navigation.navigate("QrScreen")
  }

  const insertProductInCart = async (message) => {
    setIsFetching(true);
    let codeEl = message.slice(4,8)
    let code = message.slice(0,3)
    console.log(code, codeEl)
    try {
      const userDT = await AsyncStorage.getItem('user')
      if(userDT !== null) {
        let userData = JSON.parse(userDT)
        let productData = await getProduct(code, userData.userToken)
        let test = data.findIndex(product => product.id === productData.product.id)
        if( test < 0 ){
          let newProduct = {
            id:productData.stockId,
            itemName:productData.product.name,
            itemDescription:productData.product.description,
            itemIcon:productData.product.dataUrl,
            itemPrice:parseFloat(productData.product.price),
            quantity: 1,
          }
          setData(d => [ ...d, newProduct])
          setTotal(d => d + newProduct.itemPrice)
        } else {
          if(codeEl === '0000'){
            data[test].quantity += 1
            data[test].itemPrice = parseFloat(data[test].itemPrice) + parseFloat(productData.product.price)
            setTotal(d => d + parseFloat(productData.product.price))
          }  
          if(codeEl === '1000'){
            data[test].quantity -= 1
            data[test].itemPrice = parseFloat(data[test].itemPrice) - parseFloat(productData.product.price)
            setTotal(d => d - parseFloat(productData.product.price))
            if(data[test].quantity === 0){
              data.splice(test,1)
            }
          }
        }
      }
    } catch(e) {
      // error reading value
    }
    // printBluetoothData()
    setIsFetching(false);
  }

  const getData = async () => {
    try {
      const userDT = await AsyncStorage.getItem('user')
      if(userDT !== null) {
        let userData = JSON.parse(userDT)
        const data = await getUser(userData.id, userData.userToken)
        dispatch(setName(data.name))
        dispatch(setPhone(data.phone))
        dispatch(setMail(data.email))
        dispatch(setPassword(data.password))
        dispatch(setStripeId(data.stripeId))
      }
    } catch(e) {
      // error reading value
    }
  }

  React.useEffect(()=>{
    insertProductInCart(code)
  },[code])
  React.useEffect(()=>{
    if(data.length>0){
      setDisabled(false)
    } else{
      setDisabled(true)
    }
  },)
  getData()

  const body = (
    <View style={tw`px-5`}>
      <DrawerBarButton navigation={navigation}/>
      <View style={[tw`mt-16 h-3/4`, bConnected ? tw`` : tw`justify-end self-center`]}>
        {bConnected ? 
        <View>
          <View>
            <FlatList
              data={data}
              refreshing={isFetching}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <ItemContainer data={item}/>
              )}
            />
          </View>
        </View>
        :
        <View style={tw``}>
          <Text style={tw`text-lg text-gray-200`}>Escanea el codigo <Text style={tw`font-bold`}>QR</Text></Text>
          <Text style={tw`text-lg text-gray-200`}>del <Text style={tw`font-bold`}>carro de compras</Text></Text>  
        </View>
        }
        
      </View>
      { bConnected && total>0 ? 
      <View style={tw`h-8 flex-row justify-between px-10`}>
        <Text style={tw`font-bold text-lg`}> 
          Total:
        </Text>
        <Text style={tw`font-bold text-lg`}>
          $ {total} 
        </Text> 
      </View>
      :
      <View style={tw`h-8 flex-row justify-between px-10`}>
      </View>
      }
       
      <View style={[tw`w-full h-18 rounded-10 justify-center self-center`,bConnected ? [tw`border`,twr`border-stg`] : twr`bg-stg`]}>
        { bConnected  ?
        <TouchableOpacity
              disabled={disabled}
              onPress={()=>{navigation.navigate("PaymentScreen",{total:total, dataItems:data})}}
              style={tw`justify-center flex-row`}
              >
              <Icon
                  name='checkmark-outline'
                  type='ionicon'
                  size={48}
                  color="#FFB00B"
              /> 
              <Text style={[tw`pl-4 font-bold text-lg self-center`,twr`text-stg`]}> Pagar </Text>
        </TouchableOpacity>
        :
        <TouchableOpacity 
              onPress={()=>requestBluetoothPermision()}
              style={tw`justify-center self-center`}
              >
              <Icon
                  name='qr-code-outline'
                  type='ionicon'
                  size={48}
                  color="white"
              />
        </TouchableOpacity>}
      </View>
      
    </View>
  );
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
};

export default HomeScreen;
