import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import {ThemeProvider} from 'react-native-elements'

export default class PaymentDetails extends Component{
    constructor(props){
        super(props)
        //console.log(this.props.navigation);
        this.state = {
        }
      }
      
      static navigationOptions = ({ navigation }) => {
        return {
          title: 'Transaction Details',
          headerTintColor:"#333",
          headerStyle:{
            backgroundColor:"#fff"
          },
        };
      }; 
    
    render(){
        const {navigation} = this.props;
        const data = navigation.getParam('selectedListItem', 'NO-ID');
        const tdata = navigation.getParam('transaction_data', 'NO-ID');
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
            <View style={{flex: 1}}>
              <Card style={{flex: 1,}} >
                <Avatar
                    rounded
                    size = 'large'
                    source={{
                        uri: data.avatar_url
                    }}
                    containerStyle = {{alignSelf:'center',padding:10}}
                /> 
                <Divider style={{ backgroundColor: 'blue' }} ></Divider>
                
                <Text style={{fontSize:18,flexWrap:'wrap',padding:10,alignSelf:'center'}}>You have sent Rs. {data.rightTitle} to {data.name}</Text>
              </Card>
            
            <Card>
              <View>
                <Text style = {{fontSize: 20,flexWrap: 'wrap',padding: 10,alignSelf: 'center'}}>
                    Transaction Details
                </Text> 
                <Divider style={{ backgroundColor: 'blue' }} ></Divider>               
              </View>
              
              <View style = {{flexDirection: 'row', padding: 10}}>
                <Text style = {{flex: 1,fontSize: 15, flexWrap: 'wrap',alignSelf: 'flex-start',}}>
                    Paid to:
                </Text>
                <Text style = {{fontSize: 15,alignSelf: 'flex-end'}}>
                    {data.name}
                </Text>
              </View>
              
              <View style = {{flexDirection: 'row', padding: 10}}>
                <Text style = {{flex: 1,fontSize: 15, flexWrap: 'wrap',alignSelf: 'flex-start'}}>
                    Total Amount :
                </Text>
                <Text style = {{fontSize: 15,alignSelf: 'flex-end'}}>
                    Rs. {data.rightTitle}
                </Text>
              </View>
              
              <View style = {{flexDirection: 'row',padding: 10}}>
                <Text style = {{flex: 1,fontSize: 15, flexWrap: 'wrap',alignSelf: 'flex-start'}}>
                Transaction ID:
                </Text>
                <Text style = {{fontSize: 15,alignSelf: 'flex-end'}}>
                    {tdata.txn}
                    {data.txn}
                </Text>
              </View>
            
              <View style = {{flexDirection: 'row',padding: 10}}>
                <Text style = {{flex: 1,fontSize: 15, flexWrap: 'wrap',alignSelf: 'flex-start'}}>
                    Reason:
                </Text>
                <Text style = {{fontSize: 15,alignSelf: 'flex-end'}}>
                    {data.reason}
                    {tdata.reason}
                </Text>
              </View>
            </Card>
            
            <Card>
              <View>
                <Text style = {{fontSize: 20,flexWrap: 'wrap',padding: 10,alignSelf: 'center'}}>
                    Transaction Date
                </Text>
                <Divider style= {{ backgroundColor: 'blue' }} ></Divider>
              </View>
              <View style = {{flexDirection: 'row',padding: 10}}>
                <Text style = {{flex: 1,fontSize: 15, flexWrap: 'wrap',alignSelf: 'flex-start',}}>
                    Money Transferred on:
                </Text>
                <Text style = {{fontSize: 15,alignSelf: 'flex-end'}}>
                   {tdata.datetime}
                   {data.datetime}
                </Text>
              </View>
            </Card>
            
            <Button 
              containerStyle ={{position: 'absolute',left:0,bottom:0,width:'100%'}} 
              title = 'Done'
              onPress = {() => {this.props.navigation.replace('dashboard')} }
            />
            
          </View>
        </ThemeProvider>   
        );
    }
}