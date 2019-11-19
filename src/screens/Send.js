import React,{Component} from 'react'
import PaymentContactDash from './PaymentContactDash'


export default class Send extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
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
  render(){
    const {navigation} = this.props;
    //const data = navigation.getParam('comingFrom', 'NO-ID');
    return(
      <PaymentContactDash navigation={this.props.navigation}/>
    )
  }
} 