import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Platform,
} from "react-native";
import React from "react";
import tw from 'twrnc';
import twr from "../helpers/tailwind";
import { Icon } from "react-native-elements";

import { AuthContext } from "../components/context";

const LogInScreen = ({navigation}) => {
  const { signIn } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });
  const textInputChance = (value) => {
    setData({
      ...data,
      email: value,
    });
  };
  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const logInHandle = (username, password) => {
    signIn(username, password);
  };
  const body = (
    <View style={twr`px-5`}>
      <View style={tw`-mt-4`}>
          <Image
              style={tw`w-52 h-52 m-auto`}
              source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/storetogo-97e2a.appspot.com/o/logo%2FLogo.png?alt=media&token=bec72064-6014-479e-9b8c-9d4526f9a3fc"
              }}/>
        </View>
      <View style={tw`px-8`}>
        <Text style={twr`my-4`}>Email</Text>
        <View
          style={[
            twr`border-2 border-stg bg-white rounded px-2 flex-row shadow-lg`,
            Platform.OS === "ios" ? twr`py-2` : twr`py-1`,
          ]}
        >
          <TextInput
            style={twr`w-full`}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(value) => textInputChance(value)}
          />
        </View>
        <Text style={twr`my-4`}>Password</Text>
        <View
          style={[
            twr`border-2 border-stg  bg-white rounded py-1 px-2 flex-row items-center shadow-lg`,
            Platform.OS === "ios" ? twr`py-2` : twr`py-1`,
          ]}
        >
          <TextInput
            style={twr`grow w-3/4`}
            secureTextEntry={data.secureTextEntry}
            placeholder="Password"
            onChangeText={(value) => handlePasswordChange(value)}
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
      </View>
      <View style={twr`p-8 items-center`}>
        <TouchableOpacity
          onPress={() => {
            logInHandle(data.email, data.password);
          }}
        >
          <View style={twr`bg-stg rounded-lg w-32 p-2 shadow-xl`}>
            <Text style={twr`text-white text-center text-lg`}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={twr`px-8 items-center`}>
        <Text>No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('RegisterScreen')}} >
            <Text style={twr`text-stg`}>Registrate Aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const iosView = (
    <SafeAreaView style={twr`bg-white h-full items-center justify-center`}>
      {body}
    </SafeAreaView>
  );
  const andView = (
    <View style={twr`bg-white h-full pt-10 items-center justify-center`}>
      {body}
    </View>
  );
  return Platform.OS === "ios" ? iosView : andView;
};

export default LogInScreen;
