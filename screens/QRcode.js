import React, {Component} from 'react';
import { render } from 'react-dom';

import {FlatList,StyleSheet, View, Button,TextInput,Text,Image,TouchableWithoutFeedback} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
//import { WebView } from 'react-native-webview';
//import { Buffer } from 'buffer';
//import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
//import { json } from 'body-parser';


export default class QRcode extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data :[]

        
    };
  }
      renderInner = () => (
        <View style={styles.panel}>
         
      <Text style={styles.panelTitle}> QRcode</Text>
      <Text style={styles.panelSubtitle}>
        QRcode is confidential
      </Text>
      
      <View style={styles.panelButton}>
        <QRCode style={  {      alignItems: 'center'}}

        value={JSON.stringify(this.state.data)}
        size={200}
        bgColor='black'
        fgColor='white'/>
      </View>
      
     
    </View>
  )
      renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      )
    navigation  = this.props;
    m =this.props.navigation.getParam('matriculee', 'default value')

     fetchData=async () => {
      const response = await fetch ('http://192.168.43.224:3021/parking',{
        method:'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({ma:this.m})

      });
      //console.log(response)

      const users= await response.text();
      console.log(users)
     this.setState({data:users});
     //console.log(m);
    }

      bs = React.createRef()
      //fall= new Animated.value(1)
      componentDidMount(){
        this.fetchData();
      }
   render(){
    //const { navigation } = this.props;
    



    //const {hello}= this.props.route.getParam;
       return (
        <View style={styles.container}>
          <Text>{console.log(this.state.data)}</Text>
        
        
          
          <FlatList
          data={this.state.data}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item}) =>
          <View style={{backgroundColor: '#abc123',padding:10,margin:10}}>
            <Text style={{color:"#fff",fontWeight:'bold'}}>{item.IdParking}</Text>
            </View>
        }
          />
          

        <BottomSheet
          ref={this.bs}
          snapPoints={[600, 250, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
        />
        <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
        <Image style={styles.map} />
        </TouchableWithoutFeedback>
      </View>
    
           
      
        

           

  

  
       );
   }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      panel: {
        height: 100,
        padding: 20,
        backgroundColor: '#f7f5eee8',
      },
      header: {
        backgroundColor: '#f7f5eee8',
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 100,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
      },
      map: {
        height: '100%',
        width: '100%',
      },

 
    
});