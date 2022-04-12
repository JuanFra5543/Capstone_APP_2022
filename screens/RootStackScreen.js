import { View, Text } from 'react-native'
import React from 'react'

import tw from 'twrnc';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LogInScreen from './LogInScreen';

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
    </RootStack.Navigator>
  )
}

export default RootStackScreen