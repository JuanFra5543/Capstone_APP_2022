import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import tw from 'twrnc';
import { BarCodeScanner } from "expo-barcode-scanner";
import BackButton from "../components/BackButton";

const QrScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

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
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    
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

  const iosView = <SafeAreaView style={tw`bg-white h-full`}>{body}</SafeAreaView>;
  const andView = <View style={tw`bg-white h-full pt-10`}>{body}</View>;
  return body;
};

export default QrScreen;
