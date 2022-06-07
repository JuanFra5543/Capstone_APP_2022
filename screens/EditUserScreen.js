import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert  } from 'react-native'
import tw from "twrnc";
import twr from "../helpers/tailwind";
import React from 'react'
import { Icon } from "react-native-elements";

import { AuthContext } from "../components/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from "react-redux"; 
import { selectName, selectMail, selectPhone, selectPassword,  setName, setPhone, setMail, setPassword } from '../slices/userData';
import { editUser, getUser } from '../api';
import BackButton from "../components/BackButton";

const EditUserScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const refreshUserData = async () => {
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
    navigation.navigate("Inicio")
  }

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
                        onPress: () => refreshUserData(),
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
    <View style={twr`px-5`}>
      <BackButton navigation={navigation} routes={"Usuario"} qrScreen={false}/>
      <View style={twr`w-full items-center justify-center mt-16`}>
        <Text style={twr`text-stg text-2xl`}>Editar Cuenta</Text>
        <View style={twr`px-8`}>
          <Text style={twr`my-4`}>Nombre</Text>
          <View
            style={[
              twr`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg h-10`
            ]}
          >
            <TextInput
              style={twr`w-full`}
              autoCapitalize="none"
              placeholderTextColor="#000"
              placeholder={name}
              onChangeText={(value) => textInputChance("name",value)}
            />
          </View>
          <Text style={twr`my-4`}>Telefono</Text>
          <View
            style={[
              twr`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg h-10`
            ]}
          >
            <TextInput
              style={twr`w-full`}
              autoCapitalize="none"
              keyboardType="numeric"
              placeholderTextColor="#000"
              placeholder={phone}
              onChangeText={(value) => textInputChance("phone",value)}
            />
          </View>
          <Text style={twr`my-4`}>Email</Text>
          <View
            style={[
              twr`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg h-10`
            ]}
          >
            <TextInput
              style={twr`w-full`}
              autoCapitalize="none"
              placeholderTextColor="#000"
              placeholder={mail}
              onChangeText={(value) => textInputChance("email",value)}
            />
          </View>
          <Text style={twr`my-4`}>Contraseña</Text>
          <View
            style={[
              twr`border-2 border-stg bg-white rounded pl-2 flex-row items-center shadow-lg h-10`
            ]}
          >
            <TextInput
              style={twr`grow w-3/4`}
              secureTextEntry={data.secureTextEntry}
              placeholderTextColor="#000"
              placeholder="Contraseña"
              onChangeText={(value) => textInputChance("password",value)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry} style={tw`h-full w-10 pt-2`}>
              <Icon
                name={!data.secureTextEntry ? "eye" : "eye-slash"}
                type="font-awesome"
                color="#FFB00B"
                size={16}
              />
            </TouchableOpacity>
          </View>
          <Text style={twr`my-4`}>Confirmar Contraseña</Text>
              <View
              style={[
                  twr`border-2 bg-white rounded pl-2 flex-row items-center shadow-lg h-10`,
                  data.confirmPassword ? twr`border-stg` : twr`border-danger`
              ]}
              >
              <TextInput
                  style={twr`grow w-3/4`}
                  secureTextEntry={data.secureTextEntryC}
                  placeholderTextColor="#000"
                  placeholder="Contraseña"
                  onChangeText={(value) => confirmPassword(value)}
              />
              <TouchableOpacity onPress={updateSecureTextEntryC} style={tw`h-full w-10 pt-2`}>
                  <Icon
                  name={!data.secureTextEntryC ? "eye" : "eye-slash"}
                  type="font-awesome"
                  color={ data.confirmPassword ? eyeColor : "#F55353"}
                  size={16}
                  />
              </TouchableOpacity>
          </View>
        </View>
        <View style={twr`p-8 items-center`}>
          <TouchableOpacity
            onPress={() => {editHandle();
            }}
          >
            <View style={twr`bg-stg rounded-lg w-32 p-2 shadow-xl`}>
              <Text style={twr`text-white text-center text-lg`}>Guardar Cambios</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
  const iosView = (
    <SafeAreaView style={twr`bg-white h-full`}>
      {body}
    </SafeAreaView>
  );
  const andView = (
    <View style={twr`bg-white h-full pt-10`}>
      {body}
    </View>
  );
  return Platform.OS === "ios" ? iosView : andView;
}

export default EditUserScreen