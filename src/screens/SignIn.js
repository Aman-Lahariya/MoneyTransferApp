import React, {Component} from 'react'
import {View,TextInput,Alert} from 'react-native'
import {ThemeProvider,Button,Icon,Image} from 'react-native-elements'
import styles from './styles'
import {AsyncStorage} from 'react-native'


const apiURL = "http://192.168.43.130/api/user/checklogin/"; 

export default class SignIn extends Component{
  static navigationOptions = {
    header:null,
  }

  constructor(props){
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
    this.checkLogin = this.checkLogin.bind(this);
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  async saveTp(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  checkLogin = () => {
    
    const {userName, password} = this.state;

    if(userName == '' || password ==''){
      Alert.alert("Please enter required fields");
      return;
    }
    // TODO: Enter data from here into database
    return fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.userName,
        password: this.state.password

      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson=="no"){
        Alert.alert("Please enter valid credentials");
        //console.log(responseJson);
      }
      else{
        //console.log(responseJson[0].id);
      this.saveItem('user_id', responseJson[0].id.toString());
      this.saveTp('tp_set', responseJson[0].tp_set.toString());
      
      AsyncStorage.getItem('user_id').then((keyValue) => {
        //console.log("Session ID = "+keyValue) //Display key value
        }, (error) => {
        console.log(error) //Display error
      });
 
      this.props.navigation.navigate('dashboard');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    const {containerRoot,input,inputBox,btn,titleStyle} = styles
    const theme = {
      colors:{
        primary: "#ffdc00",
      },
      Icon:{
        size: 25,
        color: "#333",
      },
    }

    return(
      <ThemeProvider theme={theme}>
        <View style={containerRoot}>
          <Image
            source={require('../../assets/western-union-logo-transparent.png')}
            style={{width:300,height:300,alignSelf:'center'}}
          />
          <View style={inputBox}>
            <Icon name= "mail" />
            <TextInput 
              style={input} 
              placeholder="Email" 
              onChangeText={text => this.setState({ userName: text})} 
            />
          </View>

          <View style={inputBox}>
            <Icon name= "lock-outline" />
            <TextInput 
              style={input} 
              placeholder='Password' 
              secureTextEntry={true} 
              onChangeText={text => this.setState({ password: text})} 
            />
          </View>

          <Button 
            title="Login" 
            containerStyle={btn} 
            titleStyle={titleStyle} 
            onPress={this.checkLogin} 
          />

          <Button 
            title="New to our app? Sign up now" 
            titleStyle={titleStyle} type="clear" 
            onPress={() => this.props.navigation.navigate('signUp')}
          />
        </View>
      </ThemeProvider>
    )
  }
}
