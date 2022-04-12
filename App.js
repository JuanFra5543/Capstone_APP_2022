import { Platform, KeyboardAvoidingView, View, Text, ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store/store';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackScreen from './screens/RootStackScreen';
import HomeScreen from './screens/HomeScreen';
import { AuthContext } from './components/context';
import { authentication } from './api';

export default function App() {
  const Stack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
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
          userName: action.id,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
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
      let userData = await authentication(user)
      
      if ( userData.accessToken !== undefined ) {
        userToken = userData.accessToken
        try{
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e) {
          console.log(e)
        }
      }
      dispatch({type: 'LOGIN', id:userName, token:userToken})
    },
    signOut: async () => {
      try{
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e)
      }
      dispatch({type: 'LOGOUT'})
    },
    signUp: () => {
      setUserToken('test');
      setIsLoading(false);
    }
  }))

  useEffect(()=>{
    setTimeout(async()=>{
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
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
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behaviour={ Platform.OS === 'ios' ? "padding" : "height"} 
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            >
              { loginState.userToken !== null ? (
                <Stack.Navigator>
                <Stack.Screen
                  name='HomeScreen'
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator> 
              ) : (
                <RootStackScreen/>
              )}
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}


