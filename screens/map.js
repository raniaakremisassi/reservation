import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text,Alert,TouchableWithoutFeedback,TouchableNativeFeedback, View ,Image, SafeAreaView, Button,Platform} from 'react-native';
//import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
//import MapViewDirections from 'react-native-maps-directions';
//import  { useState, useEffect } from 'react';
//import { NavigationEvents } from 'react-navigation';
//import {TouchableOpacity} from 'react-native'; 
var { Dimensions } = require('react-native')
{/*export default function Appl() {
 // const [location, setLocation] = useState(null);
  //const [errorMsg, setErrorMsg] = useState(null);
  //const coordinates = [
   // {
   /*  latitude: 34.74056,
      longitude: 10.76028,
    },
    {
      latitude: 36,
      longitude: 10,
    },
  ]
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location.coords.longitude)
  }
 

  return (
    
 <SafeAreaView style={styles.container}>
  
  <View>
   {Alert.alert(
    'success',
    'votre réservation est bien sauvegarder, voici votre itinéraire',
    [
           {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  
  )}
    <MapView style={styles.map}
      initialRegion={{
          latitude: 36,
          longitude: 10,
          
      }}
    />
    <MapView.Marker
        coordinate={{latitude:36.7885818,
        longitude: 10.110649}}
        title={"title"}
        description={"description"}
     />
     <MapView.Marker
        coordinate={{latitude: 36,
        longitude: 10}}
        title={"me"}
        description={"des"}
     />
 
  <Button style={styles.loginScreenButton} onPress={()=>console.log("pressed")}
title ='hi'/>

</View>


</SafeAreaView>

  

  ); }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height -100,
  },
  separator: {
    marginVertical: 4,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginScreenButton:{
    alignSelf: 'center',

    flex:2,
    marginRight:40,
    marginLeft:40,
    marginBottom:50,
    backgroundColor:'#1E6738',
    height:200,
    width:100,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
  },
}); 
*/}

export default class Appl extends Component {
    constructor(props){
        super(props);
        this.state ={
        
        longitude:0,
        latitude:0,
        error:null
            };
          

        }
        static navigationOptions = {
          title : 'Map',
      };
  
    
   
  
    
   
    componentDidMount(){
      navigator.geolocation.getCurrentPosition(position =>{
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          error:null
        });

      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy:true, timeout:2000, maximumAge:2000}
      );
    }
    render()
    {
      const {navigate} = this.props.navigation;

        return(
            <View style={styles.container}>
              {Alert.alert(
                  'success',
                   'votre réservation est bien sauvegarder, voici votre itinéraire',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ]
  
              )}
               
               <MapView
                style={styles.map}
                region={{
                    latitude: this.state.latitude,
                    longitude : this.state.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001

                }}
              > 
            <Marker coordinate={this.state}/>
            </MapView>
          <Button
            style={styles.button}
            title ='Get your QR code'
            onPress={()=>navigate(
              'QRcode')}
            
            />
            
           
            </View>
        );
    }
}
 const styles = StyleSheet.create({
   container: 
   {...StyleSheet.absoluteFillObject},
   map : 
   {...StyleSheet.absoluteFillObject

   },
   button :
   {...StyleSheet.absoluteFillObject}
 });
