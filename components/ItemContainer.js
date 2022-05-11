import { View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import twr from '../helpers/tailwind'
import { Icon } from 'react-native-elements';


function ItemContainer({data}) {
  return (
    <View style={tw`h-20 flex-row items-stretch`}>
        <View style={tw`p-8 h-8 w-8`}>
            <View style={tw`absolute left-4 top-8`}>
                <View style={tw`absolute z-1 bottom-4 bg-gray-100 h-4 w-4 rounded-full`}>
                    <Text style={tw`font-bold text-xs text-center`}>{data.quantity}</Text>
                </View>
                <Icon
                    name={data.itemIcon}
                    type='font-awesome'
                    color="#FFB00B"
                />
            </View>
        </View>
        <View style={tw`flex-none w-5/8 py-2`}>
            <Text style={tw`px-2 font-bold text-lg`}>{data.itemName}</Text>
            <Text style={tw`px-2 text-xs text-gray-400`}>{data.itemDescription}</Text>
        </View>
        <View style={tw`py-8 w-2/8`}>
            <Text style={tw`font-semibold`}>${data.itemPrice}</Text>
        </View>
    </View>
  )
}

export default ItemContainer