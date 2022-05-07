import React from 'react'

import tw from 'twrnc';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LogInScreen from './LogInScreen';
import RegisterScreen from './RegisterScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => {

  return (
    <RootStack.Navigator>
        <RootStack.Screen 
            name="LogInScreen" 
            component={LogInScreen}
            options={{
                headerShown: false,
            }}
        />
        <RootStack.Screen 
            name="RegisterScreen" 
            component={RegisterScreen}
            options={{
                headerShown: false,
            }}
        />
    </RootStack.Navigator>
  )
}

export default RootStackScreen