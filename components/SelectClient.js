import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { getClients } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useSelector, useDispatch } from "react-redux";
import { setClient, selectClient } from '../slices/userData';

const SelectClient = ({clients}) => {

  const dispatch = useDispatch()

  const clientSelected = useSelector(selectClient)

  const items = clients;
    const [selectedItem,setSelectedItem] = React.useState(clientSelected)
    const [dropDown,setDropdown] = React.useState(false)
    const selectItem = (item) => {
      dispatch(setClient(item))
      setSelectedItem(item)
      setDropdown(false)
    }

    const createData = () => {
      setDropdown(!dropDown)
    }
    
  return (
    <View style={tw`w-2/3`}>
      <View style={[tw`justify-center`, dropDown ? tw`rounded-t-2 bg-gray-100`: tw``]}>
        <TouchableOpacity style={tw`bg-gray-200 px-2 rounded-2 h-10 justify-center`} onPress={()=>{createData()}}>
            <View style={tw`flex-row justify-between`}>
                <Text style={tw`pt-1`}>{selectedItem.name}</Text>
                <Icon
                    name='caret-down-outline'
                    type='ionicon'
                    color="#bcbcbc"
                />
                </View>
        </TouchableOpacity>
        {dropDown ?  
            <FlatList
              style={tw`bg-gray-100 max-h-20`}
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <TouchableOpacity style={tw`p-2 border-b-2 border-gray-200`} onPress={()=>selectItem(item)}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            /> 
            : 
            <View></View>}
      </View>
    </View>
    
  )
}

export default SelectClient