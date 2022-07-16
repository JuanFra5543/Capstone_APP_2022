import { View, Text, TouchableOpacity, Image } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import tw from 'twrnc';
import twr from '../helpers/tailwind'
import { useSelector } from "react-redux";
import { selectName } from '../slices/userData';
import { Icon } from "react-native-elements";
import React from 'react'

import { AuthContext } from "../components/context";

const CustomDrawer = (props) => {
    const name = useSelector(selectName)
    
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={tw`flex-1`}>
        
        <DrawerContentScrollView {...props}>
            <View style={tw`p-5 items-center`}>
                <View style={[tw`h-32 w-32 rounded-full border items-center justify-center`,twr`border-stg`]}>
                    <Image
                    source={require('../assets/IconoPerfil.png')}
                    style={tw`h-38 w-38 rounded-full `}
                    />
                </View>
                <Text style={[tw`font-bold text-lg text-center pt-4`,twr`text-stg`]}>{name}</Text>
            </View>
            <View>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <View style={tw`p-5 pb-8 border-t border-gray-200`}>
            <TouchableOpacity style={tw`flex-row`} onPress={() => signOut()}>
                <Icon
                    name='exit-outline'
                    type="ionicon"
                    color='#FFB00B'
                />
                <Text style={[tw`font-semibold text-base pl-2`,twr`text-stg`]}>Log out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default CustomDrawer