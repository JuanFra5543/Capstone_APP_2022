import { View, Text, TextInput } from "react-native";
import tw from "twrnc";
import React from "react";

const CreateNewClient = ({dataProducts,total}) => {
  const [data, setData] = React.useState({
    name: "",
    lastname: "",
    ci:"",
    address:"",
    phone: "",
    email: "",
  });
  const textInputChance = (type, value) => {
    setData({
      ...data,
      [type]: value,
    });
  };
  return (
    <View style={tw`mx-4`}>
      <Text style={tw`text-center p-4 text-lg font-bold text-gray-600`}>Nuevos datos facturación</Text>
      <Text style={tw`my-2`}>Nombre</Text>
      <TextInput style={tw`border border-gray-200 h-8 text-gray-500 rounded-2`} placeholder="Nombre" onChangeText={(value) => textInputChance("name", value)} />
      <Text style={tw`my-2`}>Apellido</Text>
      <TextInput style={tw`border border-gray-200 h-8 text-gray-500 rounded-2`} placeholder="Apellido" onChangeText={(value) => textInputChance("lastname", value)} />
      <Text style={tw`my-2`}>CI</Text>
      <TextInput style={tw`border border-gray-200 h-8 text-gray-500 rounded-2`} placeholder="Cedula" onChangeText={(value) => textInputChance("ci", value)} />
      <Text style={tw`my-2`}>Direccion</Text>
      <TextInput style={tw`border border-gray-200 h-8 text-gray-500 rounded-2`} placeholder="Direccion" onChangeText={(value) => textInputChance("address", value)} />
      <Text style={tw`my-2`}>Telefono</Text>
      <TextInput style={tw`border border-gray-200 h-8 text-gray-500 rounded-2`} placeholder="Telefono" onChangeText={(value) => textInputChance("phone", value)} />
      <Text style={tw`my-2`}>Correo</Text>
      <TextInput style={tw`border border-gray-200 h-8 text-gray-500 rounded-2`} placeholder="Correo" onChangeText={(value) => textInputChance("email", value)} />
    </View>
  );
};

export default CreateNewClient;
