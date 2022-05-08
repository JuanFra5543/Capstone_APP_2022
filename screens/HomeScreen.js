import { Platform, View, SafeAreaView, TouchableOpacity, FlatList, Text} from 'react-native'
import tw from 'twrnc';
import React from "react";
import { Icon } from 'react-native-elements';

import { useDispatch } from "react-redux";
import { setName, setPhone, setMail, setPassword} from '../slices/userData';

import twr from '../helpers/tailwind'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUser } from '../api';
import DrawerBarButton from '../components/DrawerBarButton';
import ItemContainer from '../components/ItemContainer';

const data = [
  {
    id:'1234',
    itemName: 'Binoculares',
    itemDescription: 'Articulo para poder observar objetos a largas distancias',
    itemIcon:'cubes',
    itemPrice:'$XX.XX',
    quantity:1
  },
  {
    id:'5678',
    itemName: 'Calculadora',
    itemDescription: 'Articulo para poder realizar operaciones matematicas',
    itemIcon:'calculator',
    itemPrice:'$XX.XX',
    quantity:2
  }
]

const HomeScreen = ({navigation}) => {
    
  const dispatch = useDispatch();
  
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
      }
    } catch(e) {
      // error reading value
    }
  }
  
  getData()

  const body = (
    <View style={tw`px-5`}>
      <DrawerBarButton navigation={navigation}/>
      <View style={tw`mt-16 h-6/7`}>
        <FlatList
          style={[tw`border-b-2`,twr`border-stg`]}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <ItemContainer data={item}/>
          )}
        />
        <View style={tw`w-full absolute -bottom-12`}>
          <View style={[tw`w-24 h-24 bg-white rounded-full justify-center self-center border-2`,twr`border-stg`]}>
            <TouchableOpacity 
                  onPress={()=>navigation.navigate("QrScreen")}
                  style={[tw`w-20 h-20 rounded-full justify-center self-center`,twr`bg-stg`]}
                  >
                  <Icon
                      name='qr-code-outline'
                      type='ionicon'
                      size={48}
                      color="white"
                  />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
};

export default HomeScreen;
