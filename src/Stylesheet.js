import {StyleSheet} from 'react-native'
import { Colors } from 'react-native-paper';
export const RootStyles = StyleSheet.create({
    headerTitle:{
        fontFamily:"poppins-light",
        fontWeight:"300",
        fontSize:30,
        paddingLeft:10,
        color:Colors.blue700,
    }
});
export const styles = StyleSheet.create({
    font:{
        fontFamily:"poppins",
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    formLabel:{
        fontSize:13,
        padding:5,
        color:Colors.grey600
    },
    formControl:{
        backgroundColor:Colors.grey200,
        padding:10,
        borderRadius:5,
        color:Colors.grey900,
        height: 40,
    },
    questionaireQuestion:{
        textAlign:"center",
        padding:5,
        fontSize:20,
        fontFamily:"poppins-light",
        color:Colors.blue600
    },
    row:{
        display:"flex",
        flexDirection:"row",
        flexWrap: 'wrap',
    },
    col1:{
        width:"100%",
        padding:3,
    },
    col2:{
        width:"50%",
        padding:3,
    },
    col3:{
        width:"33.33%",
        padding:3,
    },
    col4:{
        width:"25%",
        padding:3,
    },
    col5:{
        width:"20%",
        padding:3,
    },
    col6:{
        width:"16.66%",
        padding:3,
    },
    col7:{
        width:"14.28%",
        padding:3,
    },
    col8:{
        width:"12.5%",
        padding:3,
    },
    col9:{
        width:"11.11%",
        padding:3,
    },
    col10:{
        width:"10%",
        padding:3,
    },
    whiteText:{
        color:Colors.white
    },
    loginBtnContainer:{
        position:"absolute",
        bottom:1,
        right:25
    },
    loginBtn:{
        position: "relative",
        bottom:30,
        backgroundColor:Colors.green800
    },
    helpButton:{
        position: "absolute",
        top:30,
        right:30,
        backgroundColor:Colors.green800
    },
    rules_title:{
        fontSize:32,
        textAlign:"center",
        color:Colors.blueGrey400,
        marginBottom:20,
        fontFamily: 'poppins-bold',
    },
    listItem:{
        fontSize:15,
        marginBottom:10,
        color:Colors.grey600,
        fontFamily: 'poppins',
    },
    cautionImage:{
        width:140,
        padding:30,
        height:70,
        marginBottom:20,
        alignSelf: 'center',
        flex:1,
    }    
});
export default styles;