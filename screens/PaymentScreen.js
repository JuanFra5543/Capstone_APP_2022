import { View, Text, Platform, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import React from 'react'
import { Icon } from 'react-native-elements';


import BackButton from "../components/BackButton";
import SelectClient from '../components/SelectClient';

import PaymentButton from '../components/PaymentButton';

import { getClients } from '../api';

import AsyncStorage from '@react-native-async-storage/async-storage';


const PaymentScreen = ({navigation, route}) => {
  
  const [clients,setClients] = React.useState([]);

    const items = route.params.dataItems
    const total = route.params.total

    const insertClients = async () => {
      try {
        const userDT = await AsyncStorage.getItem('user')
        if(userDT !== null) {
          let userData = JSON.parse(userDT)
          let clientData = await getClients(userData.id, userData.userToken)
          setClients(clientData)
        }
      } catch (error) {
        
      }
    }
  
  React.useEffect(()=>{
    insertClients()
  },[])

  const body = (
    <View style={tw`px-5 h-full`}>
      <BackButton navigation={navigation} routes={"Inicio"}/>
      <View style={tw`mt-16`}>
        <View style={tw`border-t-2 border-b-2 border-gray-100 mt-32`}>
            <View style={tw`flex-row py-2`}>
                <Text style={tw`w-3/6 font-bold`}>Nombre Item</Text>
                <Text style={tw`w-2/6 font-bold text-center`}>Cantidad</Text>
                <Text style={tw`w-1/6 font-bold text-right`}>Precio</Text>
            </View>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={tw`flex-row py-2`}>
                        <Text style={tw`w-3/6`}>{item.itemName}</Text>
                        <Text style={tw`w-2/6 text-center`}>{item.quantity}</Text>
                        <Text style={tw`w-1/6 text-right`}>{item.itemPrice}</Text>
                    </View>
                )}
            />
        </View>
        <View style={tw`p-5 flex-row justify-between`}>
          <Text style={tw`font-bold text-xl text-right`}>Total</Text>
          <Text style={tw`font-bold text-xl text-right`}>${total}</Text>
        </View>
        <View style={tw`absolute border-gray-100 py-2 h-full w-full`}>
            <Text style={tw`font-bold text-xl text-left py-4`}>Seleccione Datos Factura</Text>
            <View style={tw`flex-row justify-between absolute z-0 top-20 w-full`}>
                <SelectClient clients={clients}/>
                <TouchableOpacity style={tw`bg-green-300 rounded-2 h-10 w-20 justify-center`} onPress={()=>{navigation.navigate("CreateClient",{total:total, dataItems:items})}}>
                    <Icon
                    name='person-add-outline'
                    type='ionicon'
                    color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={tw`absolute bottom-8 w-full mx-5`}>
        <PaymentButton total={total} products={items} navigation={navigation}/>
      </View>
    </View>
  )
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
}

export default PaymentScreen