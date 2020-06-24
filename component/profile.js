import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, ScrollView} from 'react-native'; 
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
//import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
//import * as ImageManipulator from "expo-image-manipulator"; 
//import { createBottomTabNavigator } from 'react-navigation';
//import { baseUrl } from '../shared/baseUrl';

class Profile extends Component {
    constructor(props) {
      super(props);

      this.state = {
          username: '',
          password: '',
          remember: false
      };
  }
  /*
  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({tintColor}) => (
        <Icon
            name='sign-in'
            type='font-awesome'
            iconStyle={{color: tintColor}}
        />
    )
  }
  */
  handleLogin = () => {
    fetch("http://192.168.4.42:3001/users/login", {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
          })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response.success){
            //console.log(JSON.stringify(this.state));
            if (this.state.remember) {
                SecureStore.setItemAsync('userinfo', JSON.stringify(
                    {username: this.state.username, password: this.state.password,  _id: response._id,  uri: response.uri}))
                    .catch(error => console.log('Could not save user info', error));
            } else {
                SecureStore.deleteItemAsync('userinfo')
                    .catch(error => console.log('Could not delete user info', error));
            }
            console.log('Redirecting to Home Tab');
            //this.props.navigation.navigate('Home');
        }
      })
      .catch(
          error => console.log('In catch:' + error) // alert("Error " + error)
      )
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
        .then(userdata => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true})
            }
        });
    }

  render() {
    return (
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
            <CheckBox
                title='Remember Me'
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.handleLogin()}
                    title='Login'
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    buttonStyle={{backgroundColor: '#159aed'}}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.props.navigation.navigate('SignUp')}
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
      marginRight: 8
  },
  formInput: {
      padding: 6
  },
  formCheckbox: {
      margin: 6,
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

export default Profile;