import { Platform, View, Text, SafeAreaView ,Image, TouchableOpacity} from 'react-native'
import tw from 'twrnc';
import twr from '../helpers/tailwind'
import React from 'react'
import DrawerBarButton from '../components/DrawerBarButton';

//Store User
import { useSelector } from "react-redux";
import { selectName, selectMail, selectPhone, selectPassword } from '../slices/userData';
import { Icon } from 'react-native-elements';

const UserScreen = ({navigation}) => {

  const name = useSelector(selectName)
  const phone = useSelector(selectPhone)
  const mail = useSelector(selectMail)
  const password = '**********'

  const body = (
    <View>
      <DrawerBarButton navigation={navigation}/>
      <View style={tw`mt-16 py-8 items-center justify-center`}>
        <View style={tw`items-center`}>
            <Image
              source={require('../assets/IconoPerfil.png')}
              style={tw`h-36 w-36 rounded-full `}
            />
          <Text style={[tw`font-bold text-xl text-center p-5 `,twr`text-stg`]}>{name}</Text>
        </View>
        <View style={tw`p-5 border-b-2 w-full border-gray-100 `}>
          <View style={tw`px-12 flex-row items-center`}>
            <Icon
              name='phone-portrait-outline'
              type="ionicon"
              color='#FFB00B'
            />
            <Text style={tw`p-5 text-gray-300`}>{phone}</Text>
          </View>
        </View>
        <View style={tw`p-5 border-b-2 w-full border-gray-100 `}>
          <View style={tw`px-12 flex-row items-center`}>
            <Icon
              name='mail-outline'
              type="ionicon"
              color='#FFB00B'
            />
            <Text style={tw`p-5 text-gray-300`}>{mail}</Text>
          </View>
        </View>
        <View style={tw`p-5 border-b-2 w-full border-gray-100 `}>
          <View style={tw`px-12 flex-row items-center`}>
            <Icon
              name='lock-closed-outline'
              type="ionicon"
              color='#FFB00B'
            />
            <Text style={tw`p-5 text-gray-300`}>{password}</Text>
          </View>
        </View>
        <View style={tw`p-8 items-center`}>
          <TouchableOpacity
            onPress={() => {navigation.navigate('EditUserScreen')}}
          >
            <View style={[tw`rounded-lg w-32 p-2 shadow-md`,twr`bg-stg`]}>
              <Text style={tw`text-white text-center text-lg`}>Editar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return Platform.OS === 'ios' ? iosView : andView;
}

export default UserScreen