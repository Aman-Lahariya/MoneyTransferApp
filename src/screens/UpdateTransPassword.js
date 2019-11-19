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
      prev_password: "",
      new_password: "",
      confirm_new_password: "",
    };
    this.checkNewPassword = this.checkNewPassword.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Transaction Password',
      headerTintColor:"#333",
      headerStyle:{
        backgroundColor:"#fff"
      },
    };
  }; 

  checkNewPassword = () => {
    const {prev_password,new_password,confirm_new_password} = this.state;
    if(new_password == '' && confirm_new_password ==''){
      TODO:'//redirect to Dashboard'
      Alert.alert('Success','New Password Set'),[{text: 'Ok'}];
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
                  placeholder="Enter Previous Password" 
                  onChangeText={text => this.setState({ prev_password:Number})} 
                />
              </View>

              <View style={inputBox}>
                <TextInput 
                  style={input}
                  secureTextEntry = {true}
                  keyboardType = "numeric"
                  placeholder="Enter New Password" 
                  onChangeText={text => this.setState({ new_password:Number})} 
                />
              </View>

            <View style={inputBox}> 
              <TextInput 
                style={input} 
                secureTextEntry = {true}
                keyboardType = "numeric"
                placeholder='Confirm Password' 
                onChangeText={text => this.setState({ confirm_new_password: text})} 
              />
            </View>

            <Button 
              title="Update Password" 
              containerStyle={btn} 
              titleStyle={titleStyle} 
              onPress={this.checkNewPassword} 
            />
        </View>
      </ThemeProvider>
    );
  }
}
