import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { getClients } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelectClient = ({data,total}) => {
  const [items,setItems] = React.useState([]);
    const [selectedItem,setSelectedItem] = React.useState({id:-1,name:"Seleccione Cliente"})
    const [dropDown,setDropdown] = React.useState(false)
    const selectItem = (item) => {
        setSelectedItem(item)
        setDropdown(false)
    }

    const createData = () => {
      if(items.length===0){
        insertClients()
      }
      setDropdown(!dropDown)
    }
    const insertClients = async () => {
      try {
        const userDT = await AsyncStorage.getItem('user')
        if(userDT !== null) {
          let userData = JSON.parse(userDT)
          let clientData = await getClients(userData.id, userData.userToken)
          setItems(clientData)
        }
      } catch (error) {
        
      }
    }
    
  return (
    <View style={[tw`mx-2 w-2/3 justify-center`, dropDown ? tw`rounded-t-2 bg-gray-100`: tw``]}>
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
              style={tw`bg-gray-100`}
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <TouchableOpacity style={tw`p-2`} onPress={()=>selectItem(item)}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            /> 
            : 
            <View></View>}
    </View>
  )
}

export default SelectClient