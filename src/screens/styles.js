import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    containerRoot:{
        flex:1,
        margin:10,
        marginBottom:0,
    },
    containerRootCenter:{
        flex:1,
        margin:10,
        justifyContent:'center',
    },
    heading:{
        fontSize : 25,
        textAlign : 'center',
    },
    input:{ // Style for TextInput
        paddingStart:5,
        flex : 1,
        padding : 10,
    },
    inputBox:{  // Style for container to hold icon & textinput
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        paddingLeft : 10,
        paddingRight: 10,
        borderColor:"gainsboro",
        borderRadius:4,
        borderWidth:0.5,
    },
    box:{
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        marginTop:15,
        paddingLeft : 10,
        paddingRight: 10,
    },
    btn:{
        margin:10,
        backgroundColor:"#fdd907",
        borderRadius:8,
    },
    titleStyle:{
        color:"black",
        fontSize:16,
    },
    containerBottom:{
        flexDirection: 'row',
        backgroundColor:"#fdd907",
    },
})