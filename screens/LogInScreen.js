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
// import tw from 'twrnc';
import tw from "../helpers/tailwind";
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
    <View style={tw`px-5`}>
      <View style={tw`px-8`}>
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
            onChangeText={(value) => textInputChance(value)}
          />
        </View>
        <Text style={tw`my-4`}>Password</Text>
        <View
          style={[
            tw`border-2 border-stg  bg-white rounded py-1 px-2 flex-row items-center shadow-lg`,
            Platform.OS === "ios" ? tw`py-2` : tw`py-1`,
          ]}
        >
          <TextInput
            style={tw`grow w-3/4`}
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
      <View style={tw`p-8 items-center`}>
        <TouchableOpacity
          onPress={() => {
            logInHandle(data.email, data.password);
          }}
        >
          <View style={tw`bg-stg rounded-lg w-32 p-2 shadow-xl`}>
            <Text style={tw`text-white text-center text-lg`}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`px-8 items-center`}>
        <Text>No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('RegisterScreen')}} >
            <Text style={tw`text-stg`}>Registrate Aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
};

export default LogInScreen;
