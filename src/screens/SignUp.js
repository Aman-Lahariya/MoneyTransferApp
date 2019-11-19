import React, {Component} from 'react'
import {View,TextInput,Alert} from 'react-native'
import {ThemeProvider,Button,Icon } from 'react-native-elements'
import styles from './styles'

const apiURL = "http://192.168.43.130/api/user/"; 

export default class SignUp extends Component{
  static navigationOptions = {
    title:"Sign UP",
    headerTintColor:"#333",
    headerStyle:{
      backgroundColor:"#fff"
    },
  }

  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      dob: "",
      govId:"",
      password: "",
      cPassword: "",
     
    };
    //this.verifyData = this.verifyData.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  
  
  // Function to register user
  registerUser = () => {
    const {name, email, mobile, dob, password, cPassword} = this.state;
    
    // TODO: Enter data from here into database
    return fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.mobile,
        pan: this.state.govId,
        email: this.state.email,
        password: this.state.password

      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      //console.error(responseJson);
      Alert.alert("Sign Up Successful");
      this.props.navigation.navigate('signIn');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    // Function to validate data and set error label
    const verifyData = (param) => {
      const {name, email, mobile, dob, password, cPassword} = this.state;
      switch(param){
        case 'name': 
          if(name == ""){
            Alert.alert("Please enter name");
          }
          break;
        case 'email': 
          if(email == ""){
            Alert.alert("Please enter email");
          }
          break;
        case 'mobile': 
          if(mobile == ""){
            alert("Please enter mobile");
          }
          break;
        case 'dob': 
          if(dob == ""){
            Alert.alert("Please enter dob");
          }
          break;
        case 'password': 
          if(password == ""){
            Alert.alert("Please enter password");
          }
          break;
        case 'cPassword': 
          if(cPassword == ""){
            Alert.alert("Please enter cPassword");
          }
          break;
      }
    }
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

          <View style={inputBox}>
            <Icon name= "person-outline" />
            <TextInput 
              style={input} 
              placeholder="Name" 
              onChangeText={text => this.setState({name: text})} 
              onBlur={() => {verifyData("name")}}
            />
          </View>

          <View style={inputBox}>
            <Icon name= "mail"/>
            <TextInput 
              style={input} 
              placeholder="Email" 
              onChangeText={text => this.setState({email: text})} 
             //onBlur={this.verifyData('email')} 
              keyboardType={"email-address"} 
              onBlur={() => {verifyData("email")}}
            />
          </View>

          <View style={inputBox}>
            <Icon name= "smartphone" />
            <TextInput 
              style={input} 
              placeholder="Mobile No." 
              keyboardType={"number-pad"} 
              onChangeText={text => this.setState({mobile: text})} 
              onBlur={() => {verifyData("mobile")}}
            />
          </View>

          <View style={inputBox}>
            <Icon name= "date-range" />
            <TextInput 
              style={input} 
              placeholder="Date of birth (dd/mm/yy)" 
              keyboardType={"numeric"}  
              onChangeText={text => this.setState({dob: text})} 
              onBlur={() => {verifyData("dob")}}
            />
          </View>

          <View style={inputBox}>
            <Icon name= 'idcard' type='antdesign' />
            <TextInput 
              style={input} 
              placeholder="Goverment ID Number" 
              onChangeText={text => this.setState({govId: text})} 
              onBlur={() => {verifyData("dob")}}
            />
          </View>


          <View style={inputBox}>
            <Icon name= "lock-outline" />
            <TextInput 
              style={input} 
              placeholder='Password' 
              secureTextEntry={true} 
              onChangeText={text => this.setState({password: text})} 
              onBlur={() => {verifyData("password")}}
            />
          </View>

          <View style={inputBox}>
            <Icon name= "lock-outline" />
            <TextInput 
              style={input} 
              placeholder='Confirm Password' 
              secureTextEntry={true} 
              onChangeText={text => this.setState({cPassword: text})} 
              onBlur={() => {verifyData("cPassword")}}
            />
          </View>

          <Button 
            title={"SignUp"} 
            containerStyle={btn} 
            titleStyle={titleStyle} 
            onPress={this.registerUser} 
          />
        </View>
      </ThemeProvider>
    )
  }
}
