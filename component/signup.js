import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, ScrollView} from 'react-native'; 
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
//import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
//import * as ImageManipulator from "expo-image-manipulator"; 
//import { createBottomTabNavigator } from 'react-navigation';
//import { baseUrl } from '../shared/baseUrl';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false
        };
    }

    handleSignUp = () => {
    //create object with uri, type, image name
    /*
    var photo = {
        uri: this.state.image,
        type: 'image/jpeg',
        name: 'photo.jpg',
    };
    */
   console.log("IN handleSignUp()");
   fetch("http://192.168.4.42:3001/users/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        uri: ''
        })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(
           
        error => console.log('In catch:' + error) // alert("Error " + error)
    )
    /*
    //use formdata
    var formData1 = new FormData(); 
    //append created photo{} to formdata
    console.log("Before Form.append");
    formData1.append(username, password, firstname, lastname, email, '');
    console.log("Before axios");
    //use axios to POST
    axios({
        method: 'POST',
        url: 'http://localhost:3001/users/signup',
        data: formData1,
        headers: {
        "X-Powered-By": "mExpress",
        "content-type": "text/html"   
        }}) .then(response => { 
        console.log("In Response")
        console.log(response.data.face.url)
        console.log(response)
        //this.state = { avatar: response.data.face.url}
        //this.setState({ avatar: response.data.face.url });
        
        })
        .catch(function (error) { 
        console.log("In Error")
        console.log(error)
    }); 
    */
    }
    /*
    handleSignUp() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user info', error));
        }
    }
    */
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Input
                        placeholder='Username'
                        leftIcon={{type: 'font-awesome', name: 'user'}}
                        onChangeText={username => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    {/*
                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    */}
                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleSignUp()}
                            title='Sign Up'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#159aed'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10,
        paddingTop: 80
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 4
    },
    formCheckbox: {
        margin: 4,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
  });
export default SignUp;
