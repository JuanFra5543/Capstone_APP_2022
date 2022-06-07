import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, Platform } from "react-native";
import tw from "twrnc";
import React from "react";
import { createClient } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import { setClient } from '../slices/userData';

const CreateClient = ({navigation,route}) => {
    const items = route.params.dataItems
    const total = route.params.total
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        name:'',
        lastname:'',
        ci:'',
        address:'',
        phone:'',
        email:''
      });
      const textInputChance = (type, value) => {
        setData({
          ...data,
          [type]: value,
        });
      };
    
      const handleClient = async () => {
        let client = data
        try {
          const userDT = await AsyncStorage.getItem('user')
          if(userDT !== null) {
            let userData = JSON.parse(userDT)
            client.userClientId = userData.id
            let res = await createClient(userData.userToken,client)
            dispatch(setClient({id:res.id,name:`${res.name} ${res.lastname}`}))
            if(Object.keys(res)[0]==="message"){
              Alert.alert(
                  "Alerta",
                  res.message,
                  [
                    {
                      text: "OK",
                      style: "cancel",
                    }
                  ]
                );
            } else if (Object.keys(res)[0] !== "message"){
              Alert.alert(
                "Cliente Creado",
                "Se creo datos de cliente correctamente",
                [
                  {
                    text: "OK",
                    onPress:()=>{navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'PaymentScreen',
                            params: {total:total,dataItems:items},
                          },
                        ],
                      })},
                    style: "cancel",
                  }
                ]
              );
            } 
          }
        } catch (error) {
          console.log(error)
        }
      }
    

  const body = (
    <View style={tw`mx-4`}>
        <BackButton navigation={navigation} routes={"PaymentScreen"} additionalData={{total:total,dataItems:items}}/>
        <View style={tw`mt-16`}>
            <Text style={tw`text-center p-4 text-lg font-bold text-gray-600`}>Nuevos datos facturación</Text>
            <Text style={tw`my-2`}>Nombre</Text>
            <TextInput style={tw`border border-gray-200 h-8 p-2 text-gray-500 rounded-2`} placeholder="Nombre" onChangeText={(value) => textInputChance("name", value)} />
            <Text style={tw`my-2`}>Apellido</Text>
            <TextInput style={tw`border border-gray-200 h-8 p-2 text-gray-500 rounded-2`} placeholder="Apellido" onChangeText={(value) => textInputChance("lastname", value)} />
            <Text style={tw`my-2`}>CI</Text>
            <TextInput style={tw`border border-gray-200 h-8 p-2 text-gray-500 rounded-2`} placeholder="Cedula" onChangeText={(value) => textInputChance("ci", value)} />
            <Text style={tw`my-2`}>Direccion</Text>
            <TextInput style={tw`border border-gray-200 h-8 p-2 text-gray-500 rounded-2`} placeholder="Direccion" onChangeText={(value) => textInputChance("address", value)} />
            <Text style={tw`my-2`}>Telefono</Text>
            <TextInput style={tw`border border-gray-200 h-8 p-2 text-gray-500 rounded-2`} placeholder="Telefono" onChangeText={(value) => textInputChance("phone", value)} />
            <Text style={tw`my-2`}>Correo</Text>
            <TextInput style={tw`border border-gray-200 h-8 p-2 text-gray-500 rounded-2`} placeholder="Correo" onChangeText={(value) => textInputChance("email", value)} />    
        </View>
        <View>
            <TouchableOpacity style={tw`bg-green-300 m-4 p-4 rounded-2`} onPress={()=>handleClient()}>
                <Text style={tw`text-center text-white font-bold text-lg`}>Crear Cliente</Text>
            </TouchableOpacity>
        </View>
      </View>
  )
  
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
}

export default CreateClient