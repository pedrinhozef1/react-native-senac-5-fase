import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function App(){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        setErrorMsg('A permissão para acessar foi negado');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setAltitude(location.coords.latitude);
      setSpeed(location.coords.speed);
    })();
    let text = 'Aguardando..';
  
    if (errorMsg){
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  
  }, []);

  return (
    <View>
      <Text style={{ marginTop:50}}>Latitude: {latitude}</Text>
      <Text style={{ marginTop:50}}>Longitude: {longitude}</Text>
      <Text style={{ marginTop:50}}>Altitude: {altitude}</Text>
      <Text style={{ marginTop:50}}>Speed: {speed}</Text>
    </View>
  )
}
