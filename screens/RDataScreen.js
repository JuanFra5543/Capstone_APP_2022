import { Platform, View, Text, SafeAreaView, FlatList , TouchableOpacity} from 'react-native'
import tw from 'twrnc';
import twr from '../helpers/tailwind'
import React from 'react'
import DrawerBarButton from '../components/DrawerBarButton';
import DataContainer from '../components/DataContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';

const data = [
  {
    id: "1234",
    name: "Juan Francisco Ruano Vega",
    direction: "Cotocollao",
    ci: "1717171717",
    selected: false,
  },
  {
    id: "5678",
    name: "Felipe Figueroa",
    direction: "Carolina",
    ci: "1818181818",
    selected: false,
  },
  {
    id: "9101",
    name: "Christian Camacho",
    direction: "Carcelen",
    ci: "1919191919",
    selected: false,
  },
];

const RDataScreen = ({navigation}) => {
  const isSelected = async () => {
    try {
        const receiptDT = await AsyncStorage.getItem('rec_data')
        if(receiptDT !== null){
            let receiptData = JSON.parse(receiptDT)
            data.forEach((d,i)=>{
              if(receiptData.id === d.id){
                data[i].selected = true
              }
            })
        } 
    } catch (error) {
        console.log(error)
    }
  }
  isSelected()
  console.log("Hola")
  const selectData = async (data) => {
    let newData = {
        id: data.id,
        selected:true
    }
    try{
        const receiptData = await AsyncStorage.getItem('rec_data')
        if(receiptData !== null){
            await AsyncStorage.removeItem('rec_data')
            const jsonValue = JSON.stringify(newData)
            await AsyncStorage.setItem('rec_data', jsonValue)
        } else {
            const jsonValue = JSON.stringify(newData)
            await AsyncStorage.setItem('rec_data', jsonValue)
        }
    } catch(e) {
        console.log(e)
    }
  }

  const body = (
    <View style={tw`px-5`}>
      <DrawerBarButton navigation={navigation}/>
      <View style={tw`mt-16`}>
        <Text style={[tw`text-center text-xl font-bold p-5`,twr`text-stg`]}>Datos Facturación</Text>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => selectData(item)}>
                <DataContainer data={item}/>
              </TouchableOpacity>
            )}
            />
      </View>
    </View>
  )


  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
}

export default RDataScreen