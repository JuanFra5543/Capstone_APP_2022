import { View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';


const ReceiptContainer = ({data}) => {
  return (
    <View style={tw`h-20 flex-row items-stretch border-b-2 border-gray-100`}>
        <View style={tw`flex-none w-3/4 py-2 justify-center`}>
            <Text style={tw`px-4 font-bold text-lg`}>{data.date}</Text>
            <Text style={tw`px-4 text-xs text-gray-400`}>{data.name}</Text>
        </View>
        <View style={tw`h-8 w-1/4 justify-center self-center`}>
            <Text style={tw`font-semibold`}>${data.total}</Text>
        </View>
    </View>
  )
}

export default ReceiptContainer