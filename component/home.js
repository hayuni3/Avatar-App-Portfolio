import * as React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

 class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }  
  state = {
      image: null,
      imageName: null,
      myToken: null,
      avatar: null
    };
  
    render() {
      let { image } = this.state;
      let { avatar } = this.state;
      return(
     
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <View>
              <Text style={ styles.title } >Welcome to Hayat's Avatar World!</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <View>
                <Button 
                  title="Select Photo" 
                  type="outline"
                  buttonStyle={{backgroundColor: '#fff' , paddingVertical: 15, 
                  paddingHorizontal: 20, marginRight: 20, borderRadius: 6}}
                  onPress={this._pickImage} />
              </View>
            <View>
              <Button 
              title="Generate Avatar"
              type="outline" 
              buttonStyle={{backgroundColor: '#fff', paddingVertical: 15,
              paddingHorizontal:20, marginLeft: 10, borderRadius:6}}
              onPress={this.generateAvatar} />
            </View>
            </View>
            <View style={{alignItems:"center"}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              
              {image && <Image source={{ uri: avatar }} style={{ width: 200, height: 200 }} />}
            </View>
            {this.state.show ? (
              <View style={{alignItems:"center"}}>
                <Button 
                title="Save My Avatar"
                type="outline" 
                buttonStyle={{backgroundColor: '#fff', paddingVertical: 15,
                paddingHorizontal:20, marginLeft: 10, borderRadius:6}}
                onPress={this.saveAvatar} />
              </View>
            ) : null}
            </View>
        </View>
        
      );
    }
  
    componentDidMount() {
      this.props.navigation.navigate("Profile");
      this.getPermissionAsync();
    }
    
    getPermissionAsync = async () => {
      if (Constants.platform.android) {
        //const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
  
    _pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
        console.log(result);
      } catch (E) {
        console.log(E);
      }
    };

    saveAvatar = () => {
      fetch("http://192.168.4.42:3001/users/update/5eefed6c68de384870838ea9", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uri: this.state.avatar
          })
        })
        then(response => response.json())
        .then(response => {
          //console.log(response)
          if(response.success){
              console.log('saveAvatar is finished');
          }
        })
        .catch(
            error => console.log('In saveAvatar() catch:' + error) // alert("Error " + error)
        )
      
    }
    generateAvatar = () => {
      fetch("https://mirror-ai.p.rapidapi.com/token", {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "mirror-ai.p.rapidapi.com",
              "x-rapidapi-key": "c214d0a276msh9ce0e256e8d7749p1955b1jsn684a37cae436",
              "useQueryString": true
          }
      })
      .then(response => response.json()) // Getting the actual response data
      .then(data => {         
          console.log(data.token);
          this.state.myToken = data.token;
          //console.log(this.state.image.filename);
          this.setState({avatar: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FAvatar-b3375d91-9f1d-4b4d-a469-799c7142d8bf/ImagePicker/b1b41881-52d9-4db7-85d0-a42eeab657b9.png"});
          this.uploadImage();
      })
      .catch(err => {
          console.log(err);
      }); 
  }
  
  setAvatarImage(url){
    console.log(url);
    this.setState({ avatar: url });
  }
  uploadImage = () => {
    //create object with uri, type, image name
   var photo = {
      uri: this.state.image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
  
    //use formdata
    var formData = new FormData(); 
    //append created photo{} to formdata
    formData.append('photo', photo, 'myphoto.jpg');
    //use axios to POST
    axios({
      method: 'POST',
      url: 'https://mirror-ai.p.rapidapi.com/generate',
      data: formData,
      headers: {
        "x-rapidapi-host": "mirror-ai.p.rapidapi.com",
        "x-rapidapi-key": "c214d0a276msh9ce0e256e8d7749p1955b1jsn684a37cae436",
        "content-type": "multipart/form-data",
        "x-token": this.state.myToken,
        "useQueryString": true    
      }}) .then(response => { 
        console.log("In Response")
        console.log(response.data.face.url)
        console.log(response)
        //this.state = { avatar: response.data.face.url}
        this.setState({ avatar: response.data.face.url });
        this.setState({ show: true });
        
      })
      .catch(function (error) { 
        console.log("In Error")
        console.log(error)
    });
  
    
  }
  }

  
const styles = StyleSheet.create({  
    title: {
      fontSize: 24,  
      fontWeight: 'bold', 
      paddingBottom: 40,
      color: '#40b8f5',
      textShadowColor: 'black',
  
    },  
  });
  
  export  default Home;
  