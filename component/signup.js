import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, ScrollView} from 'react-native'; 
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

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
    )}

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
