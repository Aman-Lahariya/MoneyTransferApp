import React,{Component} from 'react'
import {View,TextInput,Text,StyleSheet,Alert} from 'react-native'
import {ThemeProvider,Button,Icon,Avatar} from 'react-native-elements'
import Styles from './styles'
import PaymentDetails from './PaymentDetails'
import {AsyncStorage} from 'react-native'

const apiURL = "http://192.168.43.130/api/transaction/add/"; 

export default class PaymentModule extends Component{

  constructor(props){
    super(props)
    this.state = {
      amount:"",
      reason:"",
      msg:"",
      sender_currency: "INR",
      receiver_currency: "INR",
      transactionPassword:"",
      //receiver_id: this.props.navigation.state.params.receiver_id,
      receiver_ac: this.props.navigation.state.params.receiver_id
    }

    AsyncStorage.getItem('user_id').then((keyValue) => {
      console.log(keyValue);
      this.setState({
        sender_ac: keyValue
        });
      }, (error) => {
      console.log(error) //Display error
    });

    this.checkTp = this.checkTp.bind(this);

    //this.checkTp();
    
    //console.log(this.props.navigation.state.params.receiver_id);
    console.log(this.state.receiver_ac);
  }

  
  checkTp = () => {
    console.log("inside check tp");
    AsyncStorage.getItem('tp_set').then((keyValue) => {
      console.log(keyValue);
        if(keyValue=="no"){
          Alert.alert("Please set a transaction password first. You will now be redirected..");
          this.props.navigation.navigate('dashboard');
        }
      }, (error) => {
      console.log(error) //Display error
    });
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'A Nested Details Screen'),
      headerTintColor:"#333",
      headerStyle:{
        backgroundColor:"#fff"
      },
    };
  }; 

  
  performTransaction = () => {
    // Validation 
    const {amount, reason,} = this.state;
    if(amount == ""){
      Alert.alert("Please enter amount");
      return;
    }
    if(reason == ""){
      Alert.alert("Please enter reason");
      return;
    }

    const {navigation} = this.props;
    const comingFrom = navigation.getParam('comingFrom', 'NO-ID');
    if(comingFrom == "Send"){
      //Perform send money transaction here

      // TODO: Enter data from here into database
      return fetch(apiURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_currency: this.state.sender_currency,
          receiver_currency: this.state.receiver_currency,
          sender_ac: this.state.sender_ac,
          receiver_ac: this.state.receiver_ac,
          amount: this.state.amount,
          reason: this.state.reason,
          message: this.state.msg

        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        //console.error(responseJson);
        Alert.alert("Transaction Successful");
        //This will be called at last to display details screen
        const data = this.props.navigation.getParam('selectedListItem', 'NO-ID');
        data.rightTitle = this.state.amount;
        data.reason = this.state.reason;
        //console.log(responseJson);
        
        this.props.navigation.navigate('paymentDetails',{
          selectedListItem:data,
          transaction_data: responseJson
        });
        
        //this.props.navigation.navigate('signIn');
      })
      .catch((error) => {
        console.error(error);
      });

      
    }
    if(comingFrom == "Receive"){
      //Perform receive payment transaction here
      console.log("should perform receive")
      console.log(comingFrom)
    }
  }

  render(){
    const {navigation} = this.props;
    const data = navigation.getParam('selectedListItem', 'NO-ID');
    const comingFrom = navigation.getParam('comingFrom', 'NO-ID');
    const {containerRoot,inputBox,input,box,containerBottom} = Styles
    const theme = {
      colors:{
        primary: "#ffdc00",
      },
      Icon:{
        size: 25,
        color: '#333',
      },
      Button:{
        containerStyle: {
          flex: 1,
        },
        titleStyle:{
          color:"black",
          fontSize: 20,
        },
        iconContainerStyle: {
          paddingRight: 20,
        },
      }
    }
    return(
      <ThemeProvider theme = {theme}>
        <View style = {styles_cur.container}>
          <View style = {styles_cur.details}>
            
              <Avatar
                rounded
                size='medium'
                source={{
                  uri:data.avatar_url,
                }}
              />
              <View style={{flex:3,flexDirection:'column'}} >
                <Text style= {styles_cur.text} > {data.name} </Text>
                <Text style= {styles_cur.textSmall} > {data.subtitle} </Text>
              </View>
            
          </View>
          <View>
            <View style = {inputBox}>
              <Icon name = 'rupee' type = 'font-awesome'/>
              <TextInput
                style = {input}
                placeholder = "Enter amount"
                keyboardType = 'numeric'
                onChangeText={text => this.setState({amount: text})} 
              />
            </View>

            <View style = {inputBox}>
              <TextInput
                style = {input}
                placeholder = "Reason for transfer"
                onChangeText={text => this.setState({reason: text})} 
              />
            </View>

            <View style = {inputBox}>
              <TextInput
                style = {input}
                placeholder = "Add a message (Optional)"
                onChangeText={text => this.setState({msg: text})} 
              />
            </View>

            

          </View>
          <View style = {styles_cur.next}>
            <Button 
              title = 'Next'
              onPress = {() => {this.performTransaction()} }
            />
          </View>
        </View>
      </ThemeProvider>
    )
  }
}

const styles_cur = StyleSheet.create({
  container: {
    flex:1
  },
  details: {
    flexDirection: 'row',
    padding: 20,
    height: 100
  },
  text:{
    fontSize: 18,
    textAlign: 'left',
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
  },
  textSmall:{
    fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
  },
  history:{
    flex: 1,
    borderColor: '#ffdc00',
    padding:1,
    backgroundColor: '#ffdc00',
    maxHeight: 35,
    maxWidth: 100
  },
  historyText:{
    fontSize: 11,
    color: '#616161'
  },
  next:{
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%'
  }
});
