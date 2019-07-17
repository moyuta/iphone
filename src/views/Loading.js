import React, { Component } from 'react';
import { View,AsyncStorage } from 'react-native';
import { withTranslation } from 'react-i18next';
import {  ActivityIndicator, Text, Colors } from 'react-native-paper';
import firebase from '../models/Firebase'

export class Loading extends Component {
    constructor(props){
        super(props);
        this.state = {
            logginginMessage:"",
            snackBar:true,
        }
    }
    async componentWillMount(){
        const {t,navigation} = this.props;
        const intro = await AsyncStorage.getItem('@APP:IntroDone');
        if (intro == null) {
            this.setState({logginginMessage:t("loading:awaitingnetwork")})
            return navigation.navigate("Intro");
        }
        else{
            this.setState({logginginMessage:t("loading:awaitingnetwork")})
            await firebase.auth().onAuthStateChanged((user) => {
                navigation.navigate(user?"App":"Auth");
            });
        }
    }
  render() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",minHeight:"100%"}}>
            <ActivityIndicator/>
            <Text style={{marginTop: 10,color:Colors.grey500}}>{this.state.logginginMessage}</Text>
        </View>
    );
  }
}
export default withTranslation()(Loading);