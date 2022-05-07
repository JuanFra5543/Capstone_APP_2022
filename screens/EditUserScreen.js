import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert  } from 'react-native'
import tw from "../helpers/tailwind";
import React from 'react'
import { Icon } from "react-native-elements";

import { AuthContext } from "../components/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector } from "react-redux";
import { selectName, selectMail, selectPhone, selectPassword } from '../slices/userData';
import { editUser } from '../api';
import BackButton from "../components/BackButton";

const EditUserScreen = ({navigation}) => {

  const name = useSelector(selectName)
  const phone = useSelector(selectPhone)
  const mail = useSelector(selectMail)
  const password = useSelector(selectPassword)

  let eyeColor = '#FFB00B'

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

  const editHandle = async () => {
    try {
        let user = {
            name: data.name === '' ? name:data.name,
            phone: data.phone === '' ? phone:data.phone,
            email: data.email === '' ? mail:data.email,
            password: data.password === '' ? password:data.password
        }
        const userDT = await AsyncStorage.getItem('user')
        if(userDT !== null) {
            let userData = JSON.parse(userDT)
            let res = await editUser(userData.id, userData.userToken, user)
            if(res.message==="Usuario actualizado correctamente!"){
                Alert.alert(
                    "Alerta",
                    res.message,
                    [
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("Inicio"),
                        style: "cancel"
                      }
                    ]
                  );
            } else {
                Alert.alert(
                    "Alerta",
                    res.message,
                    [
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("EditUserScreen"),
                        style: "cancel"
                      }
                    ]
                  );
            }
        }
    } catch(e) {
        console.log(e)
    }
    
  }

  const body = (
    <View style={tw`px-5`}>
      <BackButton navigation={navigation} routes={"Usuario"} />
      <View style={tw`w-full items-center justify-center mt-16`}>
        <Text style={tw`text-stg text-2xl`}>Editar Cuenta</Text>
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
              placeholder={name}
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
              placeholder={phone}
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
              placeholder={mail}
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
            onPress={() => {editHandle();
            }}
          >
            <View style={tw`bg-stg rounded-lg w-32 p-2 shadow-xl`}>
              <Text style={tw`text-white text-center text-lg`}>Guardar Cambios</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
  const iosView = (
    <SafeAreaView style={tw`bg-white h-full`}>
      {body}
    </SafeAreaView>
  );
  const andView = (
    <View style={tw`bg-white h-full pt-10`}>
      {body}
    </View>
  );
  return Platform.OS === "ios" ? iosView : andView;
}

export default EditUserScreen