import React,{Component} from 'react'
import {View,Text,ScrollView} from 'react-native'
import {ThemeProvider,Button,Icon,Card,ListItem,} from 'react-native-elements'
import styles from './styles'
import {AsyncStorage} from 'react-native'


const apiURL = "http://192.168.43.130/api/transaction/getlist/";
const LISTS=[];

export default class Dashboard extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title:"Dashboard",
      headerTintColor:"#333",
      headerStyle:{
        backgroundColor:"#fff"
      },
      headerLeft: null,
      headerRight: (
        <Button
          onPress={() => navigation.navigate('updateTransPass')}
          title="Profile"
          color="black"
          type = 'clear'
        />
      ),
    };
  }; 
  constructor(props){
    super(props);
    this.state={
      renderTxnList:[],
      user_id: ""
    }

    AsyncStorage.getItem('user_id').then((keyValue) => {
      //console.log(keyValue);
        
          //Alert.alert("Please set a transaction password first. You will now be redirected..");
          this.setState({user_id:keyValue});
          this.getTxnList();
      }, (error) => {
      console.log(error) //Display error
    });
    
  }
 
  getTxnList = () => {
    const List = [];
    
    // TODO: Enter data from here into database
    fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id
      }),
    }).then((response) => response.json())
    .then((responseJson) => {


      contents = responseJson.map((item,key) => {
        total_len= responseJson.length-1;
        refresh = "f";
        if(total_len==key)
        refresh="T";
        else
        refresh="F";
     
        if(this.state.user_id==item.sender_ac){
          item.subtitle = "Sent";
          item.name = item.receiver_ac;
        }
        else{
          item.subtitle = "Received";
          item.name = item.sender_ac;
        }

            fetch('http://192.168.43.130/api/user/getname/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: item.name
              }),
            }).then((response) => response.json())
            .then((responseJson) => {
              const list_item = {
                name: responseJson,
                avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                subtitle: item.subtitle,
                rightTitle: (item.amount).toString(),
                txn: item.txn,
                datetime: item.datetime,
                reason: item.reason
              }; 
               
                List.push(list_item);
                //console.log(refresh);
                this.setState({renderTxnList:List}); 
            })
            .catch((error) => {
              console.error(error); 
            });
           // console.log(List);
      }
      )
   
    })
    .catch((error) => {
      console.error(error);
    });
   
  }

  componentDidMount (){
    //this.getTxnList();
  }

  render(){
   
    const {renderTxnList} = this.state;
    //console.log("===========================================");
    //console.log(renderTxnList);
    const {containerRoot,containerBottom,titleStyle} = styles;
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
      <ThemeProvider theme= {theme}>
        <View style = {{flex:3}}>

          <View style={{flexDirection:'row',padding:5,paddingTop:12,paddingLeft:12,}} >
            <Text style={{flex:0.8,fontSize:20,color:"black"}}>
              Your Activity
            </Text>
            <Icon 
              name = "arrow-forward"
              containerStyle = {{flex:0.2,alignSelf : 'flex-end',}}
            />
          </View>

          <ScrollView style={{flex:2}}>
            <View>
              {
                renderTxnList.map((l, i) => (
                  <ListItem
                    key = {i}
                    leftAvatar = {{source: {uri: l.avatar_url} }}
                    title = {l.name}
                    subtitle = {l.subtitle}
                    rightTitle = {l.rightTitle}
                    chevron = {true}
                    onPress = {() => this.props.navigation.navigate('paymentDetails',{
                      selectedListItem:l,
                    })}
                    
                  />
                ))
              }
            </View>
          </ScrollView>
          
          <View style = {containerBottom} >
            <Button 
              raised = {true}
              title = "Send"
              icon={{name: 'bank-transfer-out',type: 'material-community'}}
              onPress={() => this.props.navigation.navigate('send',{
                comingFrom:"Send",
                title:"Send payment"
              })}
            />
            <Button
              raised = {true}
              title = "Receive"
              icon={{name: 'bank-transfer-in',type: 'material-community'}}
              onPress={() => this.props.navigation.navigate('send',{
                comingFrom:"Receive",
                title:"Receive payment"
              })}
            />
          </View>
        </View>
      </ThemeProvider>
    )
  }
}

