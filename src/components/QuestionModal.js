import React, { Component } from 'react';
import {StatusBar, View, Text } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { List, Title, Paragraph, Colors, Card, DataTable, Button } from 'react-native-paper';
import {styles} from '../Stylesheet'
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../models/Firebase'
const QuestionsList = {

}

export class Questions extends Component {

  async logout()   {
      await firebase.auth().signOut().then(function() {
        alert("Logged Out")
      }, function(error) {
        alert("Could not Log you out")
      });
  }
  render() {
    const {t,navigation} = this.props;

    return (
      <View style={[styles.container]}>
        <StatusBar hidden={true}/>
      </View>
    );
  }
}





export default withTranslation()(Questions);