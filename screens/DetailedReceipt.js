import { Platform, View, Text, SafeAreaView, FlatList } from "react-native";
import tw from "twrnc";
import React from "react";
import BackButton from "../components/BackButton";

const DetailedReceipt = ({ route, navigation }) => {
  const data = route.params;
  console.log(data)
  const body = (
    <View style={tw`px-5`}>
      <BackButton navigation={navigation} routes={"Recibos"} qrScreen={false}/>
      <View style={tw`mt-16`}>
        <View style={tw`border-b-2 border-gray-100 py-4`}>
          <Text>Nombre: {`${data.client.name} ${data.client.lastname}`}</Text>
          <Text>Fecha: {data.date}</Text>
          <Text>Direccion: {data.client.address}</Text>
          <Text>CI: {data.client.ci}</Text>
          <Text>Telefono: {data.client.phone}</Text>
          <Text>Correo: {data.client.email}</Text>
        </View>
        <View style={tw`border-b-2 border-gray-100`}>
            <View style={tw`flex-row py-2`}>
                <Text style={tw`w-3/6 font-bold`}>Nombre Item</Text>
                <Text style={tw`w-2/6 font-bold text-center`}>Cantidad</Text>
                <Text style={tw`w-1/6 font-bold text-right`}>Precio</Text>
            </View>
            <FlatList
                data={data.details}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={tw`flex-row py-2`}>
                        <Text style={tw`w-3/6`}>{item.product}</Text>
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
