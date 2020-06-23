/*
import * as React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "269635213408-la181sskg8u5ui9v3rs7lmoa6vd48gv1.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        console.log("success");
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render () {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <View style={{flexDirection:'row', justifyContent:'center'}}>
              <View>
                <Button 
                  title="Sign In" 
                  type="outline"
                  onPress={() => props.signIn()}
                  buttonStyle={{backgroundColor: '#fff' , paddingVertical: 15, 
                  paddingHorizontal: 20, marginRight: 20, borderRadius: 6}}
                   />
              </View>
            <View>
              <Button 
              title="Sign Up"
              type="outline" 
              buttonStyle={{backgroundColor: '#fff', paddingVertical: 15,
              paddingHorizontal:20, marginLeft: 10, borderRadius:6}}
              onPress={this.generateAvatar} />
            </View>
            </View>
    </View>

);
  }
}
  export default Profile;
  */
 /*
 import React from "react";
 import {signInWithGoogle} from '../helpers/oauth';
 import { AsyncStorage, StyleSheet, Text, View, Image, Button } from "react-native";
 import {SecureStore} from 'expo';
 //import Expo from "expo"
 import * as AppAuth from 'expo-app-auth'
 //import * as Google from 'expo-google-app-auth'
 
 export default class Profile extends React.Component {
   constructor(props) {
     super(props);
     
     this.state = {
       signedIn: false,
       name: "",
       photoUrl: ""
     }
   }

  componentDidMount()
   {
    console.log("componentDidMount");
    //this.firstLaunchCheck();
   }
  
   firstLaunchCheck = () => {
    SecureStore.getItemAsync('notFirstLaunch').then(value => {
      if (value !== 'true') {
        SecureStore.setItemAsync('notFirstLaunch', 'true');
      } 
      this.setState({notFirstLaunch: value === 'true'})
    });
  }

   signIn = async () => {
    const user = await signInWithGoogle();
    console.log("user---", user);
    await SecureStore.setItemAsync('loggedInUserName',result.user.name);
    console.log("before navigate to Home---");
    this.props.navigation.navigate("Home");
   }
   */
   /*
   signIn = async () => {
     try {
       const result = await AppAuth.authAsync({
        issuer: 'https://accounts.google.com',
        scopes: ["profile", "email"],
        clientId: "269635213408-la181sskg8u5ui9v3rs7lmoa6vd48gv1.apps.googleusercontent.com",
         //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        
       });
       console.log("result", result);
       
       if (result.accessToken =! "") {
         this.setState({
           signedIn: true,
           //name: result.user.name,
           //photoUrl: result.user.photoUrl
         })
         console.log(result)
       } else {
         console.log("cancelled")
       }
     } catch (e) {
       console.log("error", e)
     }
   }
*/
/*
   signUp(){
    return (
      <View style={styles.container}>
        <Text>Sign Up Form</Text>
      </View>
      )
    }

   render() {
     return (
       <View style={styles.container}>
         {this.state.signedIn ? (
           <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
         ) : (
           <LoginPage signIn={this.signIn}/>
         )}
       </View>
     )
   }
 }
 
 const LoginPage = props => {
   return (
     <View>
       <Text style={styles.header}>Welcome to Hayat's Avatar</Text>
       <Button title="Sign in with Google" buttonStyle={{paddingHorizontal: 20}}  onPress={() => props.signIn()} />
       <Button title="Sign Up" onPress={() => props.signUp()} />
     </View>
   )
 }
 const SignUpPage = props => {
  return (
    <View>
      <Button title="Sign Up" onPress={() => props.signIn()} />
    </View>
  )
}
 const LoggedInPage = props => {
   return (
     <View style={styles.container}>
       <Text style={styles.header}>Welcome:{props.name}</Text>
       <Image style={styles.image} source={{ uri: props.photoUrl }} />
     </View>
   )
 }


 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     alignItems: "center",
     justifyContent: "center"
   },
   header: {
     fontSize: 25
   },
   image: {
     marginTop: 15,
     width: 150,
     height: 150,
     borderColor: "rgba(0,0,0,0.2)",
     borderWidth: 3,
     borderRadius: 150
   }
 })
 */