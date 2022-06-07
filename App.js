import 'react-native-gesture-handler';
import { Platform, KeyboardAvoidingView, View, Text, ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import twr from './helpers/tailwind'
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store/store';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

import RootStackScreen from './screens/RootStackScreen';
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import ReceiptsScreen from './screens/ReceiptsScreen';
import { AuthContext } from './components/context';
import { authentication, createUser } from './api';
import CustomDrawer from './components/CustomDrawer';
import EditUserScreen from './screens/EditUserScreen';
import DetailedReceipt from './screens/DetailedReceipt';
import QrScreen from './screens/QrScreen';
import PaymentScreen from './screens/PaymentScreen';
import CreateClient from './screens/CreateClient';

export default function App() {
  const Drawer = createDrawerNavigator();

  const initialLoginState = {
    isLoading: true,
    userId: null,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGIN':
        return {
          ...prevState,
          userId: action.id,
          userName: action.mail,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userId: null,
          userToken: null,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(()=>({
    signIn: async(userName, password) => {
      const user = {
        email: userName,
        password: password
      }
      let userToken = null
      let id = null
      let userData = await authentication(user)
      if(Object.keys(userData)[0]==="message"){
        Alert.alert(
            "Alerta",
            userData.message,
            [
              {
                text: "OK",
                style: "cancel"
              }
            ]
          );
    } else {
      if ( userData.accessToken !== undefined ) {
        userToken = userData.accessToken
        id = userData.id
        try{
          const jsonValue = JSON.stringify({userToken:userToken,id:id})
          await AsyncStorage.setItem('user', jsonValue)
        } catch(e) {
          console.log(e)
        }
      }
    }
      dispatch({type: 'LOGIN', id:id, mail:userName, token:userToken}) 
    },
    signOut: async () => {
      try{
        await AsyncStorage.removeItem('user')
      } catch(e) {
        console.log(e)
      }
      dispatch({type: 'LOGOUT'})
    },
    signUp: async (user) => {
      let newUser = await createUser(user)
      return newUser
    }
  }))

  useEffect(()=>{
    setTimeout(async()=>{
      let userToken;
      userToken = null;
      try {
        const user = await AsyncStorage.getItem('user')
        if(user != null){
          let userD = JSON.parse(user)
          userToken = userD.userToken
        };
        
      } catch(e) {
        console.log(e)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token:userToken});
    },1000);
  },[])

  if ( loginState.isLoading ) {
    var loader = (
    <View style={tw`flex-1 justify-center items-center`}> 
      <ActivityIndicator size = "large" color="#ACACAC"/>
    </View>)
    return loader
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behaviour={ Platform.OS === 'ios' ? "padding" : "height"} 
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            >
              { loginState.userToken !== null ? (
                <Drawer.Navigator 
                  screenOptions={{
                    headerShown: false, 
                    drawerActiveBackgroundColor:'#FFB00B',
                    drawerActiveTintColor:'#FFF',
                    drawerInactiveTintColor:'#FFB00B',
                    drawerLabelStyle:{marginLeft:-25}
                  }} 
                  useLegacyImplementation={true} 
                  drawerContent={props => <CustomDrawer {...props}/>}>
                  <Drawer.Screen 
                    name='Inicio'
                    component={HomeScreen}
                    options={{
                      drawerIcon: ({color}) => 
                      (<Icon
                        name='cart-outline'
                        type="ionicon"
                        color={color}
                      />)
                    }}/>
                  <Drawer.Screen 
                    name='Usuario'
                    component={UserScreen}
                    options={{
                      drawerIcon: ({color}) => 
                      (<Icon
                        name='person-outline'
                        type="ionicon"
                        color={color}
                      />)
                    }}/>
                  <Drawer.Screen 
                    name='Recibos'
                    component={ReceiptsScreen}
                    options={{
                      drawerIcon: ({color}) => 
                      (<Icon
                        name='receipt-outline'
                        type="ionicon"
                        color={color}
                      />)
                    }}/>
                  <Drawer.Screen 
                    name='EditUserScreen'
                    component={EditUserScreen}
                    options={{
                      drawerItemStyle: { height: 0 }
                    }}
                    />
                  <Drawer.Screen 
                    name='DetalleFactura'
                    component={DetailedReceipt}
                    options={{
                      drawerItemStyle: { height: 0 }
                    }}
                    />
                  <Drawer.Screen 
                    name='QrScreen'
                    component={QrScreen}
                    options={{
                      drawerItemStyle: { height: 0 }
                    }}
                    />
                  <Drawer.Screen 
                    name='PaymentScreen'
                    component={PaymentScreen}
                    options={{
                      drawerItemStyle: { height: 0 }
                    }}
                    />
                  <Drawer.Screen 
                    name='CreateClient'
                    component={CreateClient}
                    options={{
                      drawerItemStyle: { height: 0 }
                    }}
                    />
                </Drawer.Navigator>
              ) : (
                <RootStackScreen/>
              )}
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>  
      </AuthContext.Provider>
    </Provider>
  );
}


