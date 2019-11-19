import React,{Component} from 'react'
import {View,TextInput,ScrollView} from 'react-native'
import {ThemeProvider, Icon,ListItem,SearchBar} from 'react-native-elements'
import * as Contacts  from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import styles from './styles' 

export default class SendPaymentDash extends Component{

  constructor(prop){
    super(prop);
    this.state={
      searchName:"",
      contactList:[],
      renderContactList:[],
    }
  }

  static navigationOptions = {
    title:"Send Payment",
    headerTintColor:"#333",
    headerStyle:{
      backgroundColor:"#fff"
    },
  }

  componentDidMount(){
    this.showContactAsync();
  }

  async showContactAsync() {
    // Ask for permission to query contacts.
    const { status} = await Permissions.askAsync(
      Permissions.CONTACTS
    );
    
    if (status !== 'granted') {
      // Permission was denied...
      alert('Hey! You heve not enabled selected permissions');
      return;
    }
    else{
      var i = 0;
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.Emails,
          Contacts.Fields.Image,
        ],
      }); 
      const Lists=[];
      data.forEach(function(item,index)
      {
        const contact = data[index];
        
        if(contact.emails===undefined){
          return;
        }
        if(!contact.imageAvailable){
          image='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';
        }
        else{
          image =contact.image.uri;
        }
        
        const list = {
          name: contact.name,
          avatar_url: image,
          subtitle: contact.emails[0].email,
        };
        
        Lists.push(list); 
      
      });
      this.setState({contactList:Lists});
      this.setState({renderContactList:Lists});
    } 
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
            <Icon onPress ={() => {
              this.searchInput.clear()
            }} name = 'cross' type= 'entypo'/>
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
                    onPress = {() => this.props.navigation.navigate('paymentModule',{selectedListItem:l})}
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
