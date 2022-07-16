import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import { BleManager } from 'react-native-ble-plx'
import tw from 'twrnc';
import { BarCodeScanner } from "expo-barcode-scanner";
import BackButton from "../components/BackButton";
import { useDispatch } from "react-redux";
import base64 from 'react-native-base64';
import { setNameBluetooth, setConnected, setMessageB } from '../slices/bluetoothData';

const BLTManager = new BleManager();

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';
const BOX_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';

const StringToBool = (input) => {
  if (input === '1') {
    return true;
  } else {
    return false;
  }
}

const BoolToString = (input) => {
  if (input === true) {
    return '1';
  } else {
    return '0';
  }
}

const QrScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const [loading, setLoading]= React.useState(false)

  //Is a device connected?
  const [isConnected, setIsConnected] = React.useState(false);

  //Is a device connected?
  const [bluetoothName, setBluetoothName] = React.useState('');

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = React.useState({});

  const [message, setMessage] = React.useState('Nothing Yet');
  const [boxvalue, setBoxValue] = React.useState(false);

  const [hasPermission, setHasPermission] = useState(null);

  const connectDevice = async (device) => {
    console.log('connecting to Device:', device.name);

    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device DC');
          setIsConnected(false);
        });

        //Read inital values

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
          });

        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then(valenc => {
            setBoxValue(StringToBool(base64.decode(valenc?.value)));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              if(base64.decode(characteristic?.value) !== 'Nothing Yet') {
                dispatch(setMessageB(base64.decode(characteristic?.value)))
              }
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'messagetransaction',
        );

        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setBoxValue(StringToBool(base64.decode(characteristic?.value)));
              console.log(
                'Box Value update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'boxtransaction',
        );

        console.log('Connection established');
        navigation.navigate("Inicio")
      });
  }

  const disconnect = async () => {
    console.log('Disconnecting start');
    if (connectedDevice != null) {
      console.log('hola')
      const isDeviceConnected = await connectedDevice.isConnected();

      console.log(isDeviceConnected,'hola')
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('DC completed'),
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  const scanAndConnect = async () => {
    console.log('scanning');
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {

      if (error) {
        console.warn(error);
        console.log(error,'.....')
      }
      if (scannedDevice && scannedDevice.name == 'BLEExample') {
        // device.id === '94:B9:7E:E9:51:7E'
        BLTManager.stopDeviceScan();
        connectDevice(scannedDevice);
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      console.log("Re trying scanning")
      BLTManager.stopDeviceScan();
      setLoading(false)
    }, 5000);
  }

  //Function for Camara permission
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
  const handleBarCodeScanned = async ({ type, data }) => {
    setLoading(true)
    dispatch(setNameBluetooth(data))
    dispatch(setConnected(true))
    setBluetoothName(data)
    await scanAndConnect()
  };

  const loadingFunction = () => {
    setTimeout(() => {
    }, 5000);
  }

  

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
          onBarCodeScanned={loading ? loadingFunction : handleBarCodeScanned}
          style={tw`h-full`}
        />
      </View>
    </View>
  );
  const andView = <View style={tw``}>{body}</View>;
  return Platform.OS === 'ios' ? body : andView;
};

export default QrScreen;
