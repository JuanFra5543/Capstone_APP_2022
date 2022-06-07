import { Platform, View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import twr from '../helpers/tailwind'
import React from "react";
import DrawerBarButton from "../components/DrawerBarButton";
import ReceiptContainer from '../components/ReceiptContainer';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReceipts } from "../api";


const ReceiptsScreen = ({ navigation }) => {
  const [data,setData] = React.useState([]);

  const getReceiptsData = async () => {
    try {
      const userDT = await AsyncStorage.getItem('user')
      if(userDT !== null) {
          let userData = JSON.parse(userDT)
          getReceipts(userData.userToken,userData.id)
          .then((data) => setData(data))
          .catch((err) => console.log(err));
      }
    } catch (error) {
        console.log(error)
    }
  }

  React.useEffect(()=>{
    getReceiptsData()
  },[])
  const body = (
    <View style={tw`px-5 z-0`}>
      <DrawerBarButton navigation={navigation}/>
      <View style={tw`mt-16 z-0`}>
        <Text style={[tw`text-center text-xl font-bold p-5`,twr`text-stg`]}>Recibos</Text>
        <FlatList
            style={tw`z-1 max-h-8/9`}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={()=>navigation.navigate('DetalleFactura',item)}
                    >
                    <ReceiptContainer data={item}/>
                </TouchableOpacity>
            )}
            />
      </View>
    </View>
  );
  const iosView = (
    <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>
  );
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === "ios" ? iosView : andView;
};

export default ReceiptsScreen;
