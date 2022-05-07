import { TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import twr from '../helpers/tailwind'
import { Icon } from 'react-native-elements';

const BackButton = ({routes,navigation}) => {
  return (
    <TouchableOpacity 
                onPress={()=>navigation.navigate(routes)}
                style={tw`bg-gray-100 absolute top-2 left-4 z-1 p-3 rounded-full shadow-lg`}
                >
                <Icon
                    name='arrow-back-outline'
                    type='ionicon'
                    color="#FFB00B"
                />
    </TouchableOpacity>
  )
}

export default BackButton