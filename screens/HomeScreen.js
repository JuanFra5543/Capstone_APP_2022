import { Platform, View, SafeAreaView, TouchableOpacity, FlatList, Text} from 'react-native'
import tw from 'twrnc';
import React from "react";
import { Icon } from 'react-native-elements';

import { useSelector, useDispatch } from "react-redux";
import { setName, setPhone, setMail, setPassword } from '../slices/userData';
import { selectId, selectNameBluetooth, selectAddress, selectConnected } from '../slices/bluetoothData';

import twr from '../helpers/tailwind'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUser, getProduct } from '../api';
import DrawerBarButton from '../components/DrawerBarButton';
import ItemContainer from '../components/ItemContainer';
import SelectClient from '../components/SelectClient';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CreateNewClient from '../components/CreateNewClient';

const productsData = ["1_1_Doritos","1_2_Ruffles","1_3_Nachos","1_4_Kachitos"]

const HomeScreen = ({navigation}) => {
   
  const sheetRef = React.useRef(<BottomSheet></BottomSheet>);
  const [isOpen, setIsOpen] = React.useState(false)
  const [snapPoints,setSnapPoint] = React.useState(["30%"])
  const [createNew, setCreateNew] = React.useState(false)

  const [isFetching, setIsFetching] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  const [data,setData] = React.useState([])

  const dispatch = useDispatch();
  
  const bId = useSelector(selectId)
  const bName = useSelector(selectNameBluetooth)
  const bAddress = useSelector(selectAddress)
  const bConnected = useSelector(selectConnected)

  const changeDistance = () => {
    if(snapPoints[0]==="90%"){
      setCreateNew(false)
      setSnapPoint(["30%"])
    } else {
      setCreateNew(true)
      setSnapPoint(["90%"])
    }
  }

  const testFunction = React.useCallback((index) => {
    sheetRef.current?.snapToIndex(index)
    setIsOpen(true)
  },[])

  const testFunction2 = () => {
    if(snapPoints[0]==="90%"){
      setCreateNew(false)
      setSnapPoint(["30%"])
    }
    setIsOpen(false)
  }

  const printBluetoothData = () => {
    console.log(bId,bName,bAddress,bConnected)
  }

  const insertProductInCart = async () => {
    setIsFetching(true);
    try {
      const userDT = await AsyncStorage.getItem('user')
      if(userDT !== null) {
        let ranNum = Math.floor(Math.random()*(5-1))
        let userData = JSON.parse(userDT)
        let productData = await getProduct(productsData[ranNum], userData.userToken)
        let test = data.findIndex(product => product.id === productData.id)
        if( test < 0 ){
          let newProduct = {
            id:productData.id,
            itemName:productData.name,
            itemDescription:productData.description,
            itemIcon:'calculator',
            itemPrice:parseFloat(productData.price),
            quantity: 1,
          }
          setData(d => [ ...d, newProduct])
          setTotal(d => d + newProduct.itemPrice)
        } else {
          data[test].quantity += 1
          data[test].itemPrice = parseFloat(data[test].itemPrice) + parseFloat(productData.price)
          setTotal(d => d + parseFloat(productData.price))
        }
      }
    } catch(e) {
      // error reading value
    }
    printBluetoothData()
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
      }
    } catch(e) {
      // error reading value
    }
  }
  
  getData()

  const body = (
    <View style={[tw`px-5`,isOpen? tw`bg-gray-500`:tw``]}>
      <DrawerBarButton navigation={navigation}/>
      <View style={[tw`mt-16 h-3/4`, bConnected ? tw`` : tw`justify-end self-center`]}>
        {bConnected ? 
        <View>
          <View style={tw`p-5`}>
            <TouchableOpacity onPress={()=>{insertProductInCart()}}>
              <Text> Hola </Text>
            </TouchableOpacity>
          </View>
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
      { bConnected ? 
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
      
      <View style={[tw`w-full h-18 rounded-10 justify-center self-center`,bConnected ? [tw`border`,twr`border-stg`] : isOpen? tw`bg-gray-500` : twr`bg-stg`]}>
        { bConnected ?
        <TouchableOpacity 
              onPress={()=>{testFunction(0)}}
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
              onPress={()=>navigation.navigate("QrScreen")}
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
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={-1} enablePanDownToClose={true} onClose={()=>{testFunction2()}}>
        <BottomSheetView>
          { createNew ? 
            <View>
              <View style={tw`p-2 flex-row justify-around`}>
                <Text style={tw`font-bold`}> 
                  Total:
                </Text>
                <Text style={tw`font-bold`}>
                  $ {total} 
                </Text> 
              </View>
              <CreateNewClient  dataProducts={data} total={total}/>
            </View>
          :
          <View>
            <View style={tw`p-2 flex-row justify-around`}>
                <Text style={tw`font-bold`}> 
                  Total:
                </Text>
                <Text style={tw`font-bold`}>
                  $ {total} 
                </Text> 
            </View>
            <View style={tw`flex-row`}>
              <SelectClient data={data} total={total}/>
              <TouchableOpacity style={tw`mx-2 bg-green-300 rounded-2 h-10 w-20 justify-center`} onPress={()=>{changeDistance()}}>
                <Icon
                  name='person-add-outline'
                  type='ionicon'
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>
          }
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
};

export default HomeScreen;
