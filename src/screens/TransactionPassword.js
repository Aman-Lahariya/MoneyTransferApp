import React, {Component} from 'react'
import {Text,View,TextInput,Alert} from 'react-native'
import {ThemeProvider,Button,Icon,Image} from 'react-native-elements'
import { Card, ListItem} from 'react-native-elements'
import { Divider } from 'react-native-elements';
import styles from './styles'

export default class MoneyTransfer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm_password: "",
    };
    this.checkPassword = this.checkPassword.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Transaction Password',
      headerTintColor:"#333",
      headerStyle:{
        backgroundColor:"#fff"
      },
    };
  }; 


  checkPassword = () => {
    const {password,confirm_password} = this.state;
    if(password == '' && confirm_password ==''){
      TODO:'//redirect to Dashboard'
      Alert.alert('Success','Password Set'),[{text: 'Ok'}];
    }else{
      Alert.alert('Error', 'Password/ Cofirm Password wrong', [{
        text: 'Ok'
      }]);
    }
  }

  render() {
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
    return (
          <ThemeProvider theme = {theme}>
             <View style={{flex: 1}}>
              
             <View style={inputBox}>
              <TextInput 
                style={input}
                secureTextEntry = {true}
                keyboardType = "numeric"
                placeholder="Enter Transaction Password" 
                onChangeText={text => this.setState({ password:Number})} 
              />
          </View>

          <View style={inputBox}> 
            <TextInput 
              style={input} 
              secureTextEntry = {true}
              keyboardType = "numeric"
              placeholder='Confirm Transaction Password' 
              onChangeText={text => this.setState({ confirm_password: text})} 
            />
          </View>

          <Button 
            title="Confirm Password" 
            containerStyle={btn} 
            titleStyle={titleStyle} 
            onPress={this.checkPassword} 
          />
        </View>
      </ThemeProvider>
    );
  }
}
