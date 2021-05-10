import React, { useState } from 'react'
//import DatePicker from 'react-native-datepicker'
import MyDatePicker from '../components/DatePicker'
import MyTimePicker from '../components/TimePicker'
import {theme} from '../theme'
import { Ionicons } from '@expo/vector-icons'; 
import TimePicker from "react-native-24h-timepicker";
import DatePicker from 'react-native-datepicker'


//import DateTimePicker from '@react-native-community/datetimepicker'
import { 
    View, 
    Text,
    TextInput, 
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    Alert
    
} from 'react-native';
import { Button} from 'react-native-paper'
import * as Animatable from'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Hi extends React.Component {
    static navigationOptions = {
        title : 'Hi',
    }
    constructor(props) {
        super(props);
        this.state = {
            matricule:"",
            date:"",
          time: ""
        };
      }
      storeData=async () => {
        await fetch ('http://192.168.43.224:3021/reservation', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              matricule: this.state.matricule,
              time: this.state.time,
              date: this.state.date
            })

          })
          .then((Response) => Response.text())
          .then((res => Alert.alert("Success", 
          "Your reservation was carried successfully, press ok to check your itinerary", 
          [{text: 'OK', onPress: () => {navigate.QRcode}}])
          ))
          
         // console.log(res)
        //var users= await res.json();
        //console.log("ahla bik")
      // this.setState({data:users});
      }

     textInputChange = (val) => {
        if( val.length ==11)  {
            this.setState({
                matricule: val,
                check_textInputChange: true,
                isValidUser: true
            });
            
        } else {

            this.setState({
                    matricule: val,
                    check_textInputChange: false,
                    isValidUser: false
                });
        }
    }
    onCancel() {
        this.TimePicker.close();
      }
    
      onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
      }
      render (){
        const {navigate} = this.props.navigation;
        const storeData=async () => {
          await fetch ('http://192.168.43.224:3021/reservation', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                matricule: this.state.matricule,
                time: this.state.time,
                date: this.state.date
              })
  
            })
            .then((Response) => Response.text())
            .then(res => {if ((res)=='no') {Alert.alert(
              'Echec',
               'no place is available, try another time',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
               ]

          )
          }
          else  {Alert.alert("Success", 
           "Your reservation was carried successfully, press ok to check your itinerary", 
            [{text: 'OK', onPress: () => { this.props.navigation.navigate('QRcode', {
               itemId: 86,
              matriculee: this.state.matricule,
            })}}])}  })
           // .then((res => Alert.alert("Success", 
         //   "Your reservation was carried successfully, press ok to check your itinerary", 
         //   [{text: 'OK', onPress: () => { this.props.navigation.navigate('QRcode', {
           //   itemId: 86,
          //    matriculee: this.state.matricule,
          //  })}}])
          //  ))
            
           // console.log(res)
          //var users= await res.json();
          //console.log("ahla bik")
        // this.setState({data:users});
        }


   
    return(
        <View style={styles.container}>
        <TouchableOpacity  style={{ marginTop: 40, marginStart: 30 }} onPress={navigate.goBack}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.surface} />
            </TouchableOpacity>
        <View style={styles.header}>
            <Text style={styles.text_header}>Reservation </Text>
        </View>

        <Animatable.View  
        style={styles.footer}
        animation="fadeInUpBig"
        useNativeDriver={true}
        >
            
            <Text style={styles.text_footer}>Licence Plate:</Text>
            <View style={styles.action}>
                
                <FontAwesome 
                    name="car"
                    size={20}
                    color={theme.colors.primary}
                    style={{paddingBottom: 10, paddingLeft: 10}}
                />
                <TextInput 
                    placeholder="Please enter your licence plate"
                    placeholderTextColor= "grey"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) =>this.textInputChange(val)}
                   
                    
                />
                {this.state.check_textInputChange? 
                <Feather
                name="check-circle"
                color={theme.colors.primary}
                size={20}
                />
                : null}
            </View>
            <Text style={[styles.text_footer, {
                
                marginTop: 15
            }]}>Reservation Date:</Text>
            <View style={styles.container1}>

            <DatePicker
        style={{width: 200, paddingLeft: 10}}
        date={this.state.date}
        mode="date"
        placeholder="Pick a date"
        placeholderTextColor= "#808080"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2021-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        
        customStyles={{
          dateIcon: {
            
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            overlayColor: theme.colors.primary

          },
          dateInput: {
            marginLeft: 36,
            borderRadius: 10,
            borderColor: "#A9A9A9"
          }
         
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />   
            </View>
            <Text style={[styles.text_footer, {
                
                marginTop: 15
            }]}>Arrival Time:</Text>
            <View style={styles.container1}>
            <View style={styles.container11}>
         <View style={styles.action1}>
         <Feather
                name="clock"
                color={theme.colors.primary}
                size={30}
                onPress={() => this.TimePicker.open()}
                />
 

       <Text style={styles.text1}>
         {this.state.time}</Text>
         
        <TimePicker
        
          ref={ref => {
            this.TimePicker = ref;
          }}
          
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
         
   </View>
        
        
      </View>                
                
            </View>
                
            <View style={[styles.button,{marginButtom: 20}]}>
            
            <Button style={{backgroundColor: theme.colors.primary, height: 50, width: 250, borderRadius: 20, justifyContent: 'center'}} 
            onPress={()=>{storeData()
               // Alert.alert("Success", 
               // "Your reservation was carried successfully, press ok to check your itinerary", 
               // [{text: 'OK', onPress: () => {this.storeData()}}])
                }}
                >
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: theme.colors.surface}}>Make Reservation</Text>
            </Button>
               </View>
               
        </Animatable.View>
        
      </View>
    )

}
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: theme.colors.primary
    },
    container1: {
      
      backgroundColor: theme.colors.surface
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //paddingVertical:150,
        paddingHorizontal: 10
    },
    
    title: {
        color: '#0000A0',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 50,
        alignSelf: 'center'
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row' 
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  text_footer: {
      color: theme.colors.secondary,
      fontSize: 15,
      fontWeight: 'bold',
      paddingVertical:20,
      
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20
  },
    
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 20,
      color: '#000000',
      
  },
  container11: {
   
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 20
  },
  text1: {
    fontSize: 20,
    paddingLeft: 40,
    color: '#000000',
    
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.error,
    paddingHorizontal: 50,
    borderRadius: 3,
    alignItems: "center",
   
  },
  action1: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
});
