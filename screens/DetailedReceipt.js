import { Platform, View, Text, SafeAreaView, FlatList } from "react-native";
import tw from "twrnc";
import React from "react";
import BackButton from "../components/BackButton";

const dataItem = [
  {
    id: "1234",
    itemName: "Gafas",
    quantity: "1",
    price: "$XX.XX",
  },
  {
    id: "5678",
    itemName: "Calculadora",
    quantity: "2",
    price: "$XX.XX",
  },
  {
    id: "9101",
    itemName: "Tomatodo",
    quantity: "4",
    price: "$XX.XX",
  },
];

const DetailedReceipt = ({ route, navigation }) => {
  const data = route.params;
  const body = (
    <View style={tw`px-5`}>
      <BackButton navigation={navigation} routes={"Recibos"} />
      <View style={tw`mt-16`}>
        <View style={tw`border-b-2 border-gray-100 py-4`}>
          <Text>Nombre: {data.clientName}</Text>
          <Text>Fecha: {data.receiptDate}</Text>
          <Text>Direccion: direccion</Text>
          <Text>CI: cedula</Text>
          <Text>Telefono: telefono</Text>
          <Text>Correo: correo</Text>
        </View>
        <View style={tw`border-b-2 border-gray-100`}>
            <View style={tw`flex-row py-2`}>
                <Text style={tw`w-3/6 font-bold`}>Nombre Item</Text>
                <Text style={tw`w-2/6 font-bold text-center`}>Cantidad</Text>
                <Text style={tw`w-1/6 font-bold text-right`}>Precio</Text>
            </View>
            <FlatList
                data={dataItem}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={tw`flex-row py-2`}>
                        <Text style={tw`w-3/6`}>{item.itemName}</Text>
                        <Text style={tw`w-2/6 text-center`}>{item.quantity}</Text>
                        <Text style={tw`w-1/6 text-right`}>{item.price}</Text>
                    </View>
                )}
            />
        </View>
        <View style={tw`p-5`}>
          <Text style={tw`font-bold text-xl text-right`}>{data.price}</Text>
        </View>
      </View>
    </View>
  );
  const iosView = (
    <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>
  );
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === "ios" ? iosView : andView;
};

export default DetailedReceipt;
