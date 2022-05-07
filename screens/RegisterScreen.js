import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert  } from 'react-native'
import tw from "../helpers/tailwind";
import React from 'react'
import { Icon } from "react-native-elements";

import { AuthContext } from "../components/context";

const RegisterScreen = ({navigation}) => {
    

  let eyeColor = '#FFB00B'

  const { signUp } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    secureTextEntry: true,
    secureTextEntryC: true,
    confirmPassword: true,
  });

  const textInputChance = (type,value) => {
    setData({
      ...data,
      [type]: value,
    });
  }

  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntryC = () => {
    setData({
        ...data,
        secureTextEntryC: !data.secureTextEntryC,
    });
};


  const confirmPassword = (value) => {
    if(data.password!==value){
        setData({
            ...data,
            confirmPassword: false,
        });
    } else {
        setData({
            ...data,
            password: value,
            confirmPassword: true,
        });
    }
  }

  const registerHandle = async () => {
    let user = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password
    }
    let res = await signUp(user)
    if(Object.keys(res)[0]==="message"){
        Alert.alert(
            "Alerta",
            res.message,
            [
              {
                text: "OK",
                onPress: () => navigation.push("RegisterScreen"),
                style: "cancel"
              }
            ]
          );
    } else {
        navigation.navigate("LogInScreen")
    }
  }

  const body = (
    <View style={tw`px-5 w-full`}>
      <Text style={tw`text-stg text-2xl`}>Creacion de Cuenta</Text>
      <View style={tw`px-8`}>
        <Text style={tw`my-4`}>Nombre</Text>
        <View
          style={[
            tw`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg`,
            Platform.OS === "ios" ? tw`py-2` : tw`py-1`,
          ]}
        >
          <TextInput
            style={tw`w-full`}
            autoCapitalize="none"
            placeholder="Nombre"
            onChangeText={(value) => textInputChance("name",value)}
          />
        </View>
        <Text style={tw`my-4`}>Telefono</Text>
        <View
          style={[
            tw`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg`,
            Platform.OS === "ios" ? tw`py-2` : tw`py-1`,
          ]}
        >
          <TextInput
            style={tw`w-full`}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Telefono"
            onChangeText={(value) => textInputChance("phone",value)}
          />
        </View>
        <Text style={tw`my-4`}>Email</Text>
        <View
          style={[
            tw`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg`,
            Platform.OS === "ios" ? tw`py-2` : tw`py-1`,
          ]}
        >
          <TextInput
            style={tw`w-full`}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(value) => textInputChance("email",value)}
          />
        </View>
        <Text style={tw`my-4`}>Contraseña</Text>
        <View
          style={[
            tw`border-2 border-stg  bg-white rounded py-1 px-2 flex-row items-center shadow-lg`,
            Platform.OS === "ios" ? tw`py-2` : tw`py-1`,
          ]}
        >
          <TextInput
            style={tw`grow w-3/4`}
            secureTextEntry={data.secureTextEntry}
            placeholder="Contraseña"
            onChangeText={(value) => textInputChance("password",value)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Icon
              name={!data.secureTextEntry ? "eye" : "eye-slash"}
              type="font-awesome"
              color="#FFB00B"
              size={16}
            />
          </TouchableOpacity>
        </View>
        <Text style={tw`my-4`}>Confirmar Contraseña</Text>
            <View
            style={[
                tw`border-2 bg-white rounded py-1 px-2 flex-row items-center shadow-lg`,
                Platform.OS === "ios" ? tw`py-2` : tw`py-1`, data.confirmPassword ? tw`border-stg` : tw`border-danger`
            ]}
            >
            <TextInput
                style={tw`grow w-3/4`}
                secureTextEntry={data.secureTextEntryC}
                placeholder="Contraseña"
                onChangeText={(value) => confirmPassword(value)}
            />
            <TouchableOpacity onPress={updateSecureTextEntryC}>
                <Icon
                name={!data.secureTextEntryC ? "eye" : "eye-slash"}
                type="font-awesome"
                color={ data.confirmPassword ? eyeColor : "#F55353"}
                size={16}
                />
            </TouchableOpacity>
        </View>
      </View>
      <View style={tw`p-8 items-center`}>
        <TouchableOpacity
          onPress={() => {
            registerHandle();
          }}
        >
          <View style={tw`bg-stg rounded-lg w-32 p-2 shadow-xl`}>
            <Text style={tw`text-white text-center text-lg`}>Registrarse</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
  const iosView = (
    <SafeAreaView style={tw`bg-white h-full items-center justify-center`}>
      {body}
    </SafeAreaView>
  );
  const andView = (
    <View style={tw`bg-white h-full pt-10 items-center justify-center`}>
      {body}
    </View>
  );
  return Platform.OS === "ios" ? iosView : andView;
}

export default RegisterScreen