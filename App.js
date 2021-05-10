import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  {useState,useEffect} from 'react';
import {Button,SafeAreaView, FlatList,ActivityIndicator} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MapView, { Marker } from 'react-native-maps';
import QRcode from './screens/QRcode';
import Hi from './screens/reservation';
import { unmountComponentAtNode } from 'react-dom';

const Navigator = createStackNavigator({
  Hi : {screen: Hi},
  QRcode :{screen :QRcode},
});


const App= createAppContainer(Navigator);
export default App;