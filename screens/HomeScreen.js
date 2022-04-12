import { Platform, View, Text, SafeAreaView, Image , TouchableOpacity} from 'react-native'
import tw from 'twrnc';
import React from "react";

import twr from '../helpers/tailwind'

import { AuthContext } from "../components/context";

const HomeScreen = () => {
    
  const { signOut } = React.useContext(AuthContext);

  const body = (
    <View style={tw`px-5 flex-row`}>
      <Text>Hola yo soy home </Text>
      <TouchableOpacity onPress={() => {signOut()}} >
          <Text style={twr`text-stg`}>screen 🧡</Text>
      </TouchableOpacity>
    </View>
  );
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
};

export default HomeScreen;
