import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import tw from 'twrnc';
import { BarCodeScanner } from "expo-barcode-scanner";
import BackButton from "../components/BackButton";
import { useDispatch } from "react-redux";
import { setNameBluetooth, setConnected } from '../slices/bluetoothData';

const QrScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    dispatch(setNameBluetooth(data))
    dispatch(setConnected(true))
    navigation.navigate("Inicio")
    
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View>
        <Text>Solicitando permiso de camara</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text style={{ margin: 10 }}>Activar permiso de la camara</Text>
        <TouchableOpacity onPress={() => askForCameraPermission()}>
            <Text>Permitir Camara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Return the View
  const body = (
    <View>
      <BackButton navigation={navigation} routes={"Inicio"} qrScreen={true}/>
      <View>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={tw`h-full`}
        />
      </View>
    </View>
  );
  return body;
};

export default QrScreen;
