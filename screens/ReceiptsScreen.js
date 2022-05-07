import { Platform, View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import twr from '../helpers/tailwind'
import React from "react";
import DrawerBarButton from "../components/DrawerBarButton";
import ReceiptContainer from '../components/ReceiptContainer';

const data = [
  {
    id: "1234",
    receiptDate: "30/03/2022",
    clientName: "Juan Francisco Ruano Vega",
    price: "$XX.XX",
  },
  {
    id: "5678",
    receiptDate: "10/04/2022",
    clientName: "Felipe Figueroa",
    price: "$XX.XX",
  },
  {
    id: "9101",
    receiptDate: "16/04/2022",
    clientName: "Christian Camacho",
    price: "$XX.XX",
  },
];

const ReceiptsScreen = ({ navigation }) => {
  const body = (
    <View style={tw`px-5`}>
      <DrawerBarButton navigation={navigation}/>
      <View style={tw`mt-16`}>
        <Text style={[tw`text-center text-xl font-bold p-5`,twr`text-stg`]}>Recibos</Text>
        <FlatList
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
