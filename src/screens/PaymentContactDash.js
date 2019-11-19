import React,{Component} from 'react'
import {View,TextInput,ScrollView} from 'react-native'
import {ThemeProvider, Icon,ListItem,SearchBar} from 'react-native-elements'
import * as Contacts  from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import styles from './styles' 
import {AsyncStorage} from 'react-native'


const apiURL = "http://192.168.43.130/api/user/"; 

export default class SendPaymentDash extends Component{

  constructor(prop){
    super(prop);
    this.state={
      searchName:"",
      contactList:[],
      renderContactList:[],
      user_id: ""
    }

    
  }

  /* static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('comingFrom', 'A Nested Details Screen'),
      headerTintColor:"#333",
      headerStyle:{
        backgroundColor:"#fff"
      },
    };
  };  */

  componentDidMount(){
    this.showContactAsync();
  }

  async showContactAsync() {
    // Ask for permission to query contacts.
    /*const { status} = await Permissions.askAsync(
      Permissions.CONTACTS
    );
    
    if (status !== 'granted') {
      // Permission was denied...
      alert('Hey! You have not enabled selected permissions');
      return;
    }
    */
    //else{
      /*const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.Emails,
          Contacts.Fields.Image,
        ],
      }); 
      */
      const Lists=[];


      return fetch(apiURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
      .then((responseJson) => {
        //console.error(responseJson);
        //console.log(responseJson);

        contents = responseJson.map((item) => {

          AsyncStorage.getItem('user_id').then((keyValue) => {
            console.log("Session ID = "+keyValue) //Display key value

            if(item.id!=keyValue){
              //console.log(item.id);
    
              //We need to return the corresponding mapping for each item too.
              
              if(item.email===undefined){
                return;
              }
              if(!item.avatar_url){
                image='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';
              }
              else{
                image =item.image.uri;
              }
              
              const list = {
                id: item.id,
                name: item.name,
                avatar_url: image,
                subtitle: item.email
              };

              if(Object.keys(list).length>0){
                Lists.push(list); 
              //console.log(list);
              this.setState({contactList:Lists});
              this.setState({renderContactList:Lists});

              }
              }

            }, (error) => {
            console.log(error) //Display error
          });

      
         });
         
      })
      .catch((error) => {
        console.error(error);
      });
      
      
    //} 
  }  

  async filterContacts() {
    // Ask for permission to query contacts.
    const { status} = await Permissions.askAsync(
      Permissions.CONTACTS
    );
    
    if (status !== 'granted') {
      // Permission was denied...
      alert('Hey! You heve not enabled selected permissions');
      return;
    }else{
      // Filter list here
      const List=[];
      searchText=this.state.searchName;
      this.state.contactList.forEach(function(item,index){
        if(item.name.indexOf(searchText)>-1){
          List.push(item);
        }
      });
      this.setState({renderContactList:List});
    }
  }

  render(){
    const {navigation} = this.props;
    const {containerRoot,inputBox,input,} = styles;
    const {renderContactList} = this.state;
    const theme = {
      colors:{
        primary: "#ffdc00",
      },
      Icon:{
        size: 25,
        color: '#333',
      },
    }
    return(
      <ThemeProvider theme = {theme}>
        <View style = {containerRoot}>

          <View style = {inputBox}>
            <Icon name = 'search' />
            <TextInput
              style = {input}
              placeholder = "Enter name or email" 
              onChangeText = { text => { this.setState({searchName: text}); this.filterContacts(); } }
              ref={input => { this.searchInput = input }}
            />
            <Icon 
              name = 'cross' 
              type= 'entypo'
              onPress = {() => {this.searchInput.clear(); this.filterContacts(); this.setState({searchName:''}); }}
            />
          </View> 
    
          <ScrollView style = {{flex:0.9}}>
            <View>
              {
                renderContactList.map((l, i) => (
                  <ListItem
                    key = {i}
                    leftAvatar = {{source: {uri: l.avatar_url} }}
                    title = {l.name}
                    subtitle = {l.subtitle}
                    rightTitle = {l.rightTitle}
                    chevron = {true}
                    onPress = {() => 
                      this.props.navigation.navigate('paymentModule',{
                      selectedListItem:l,
                      comingFrom: navigation.getParam('comingFrom', 'NO-ID'),
                      title: navigation.getParam('title', 'NO-ID'),
                      receiver_id: l.id
                    })}
                  />
                ))
              }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}
