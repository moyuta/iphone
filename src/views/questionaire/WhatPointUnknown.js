import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {styles} from '../../Stylesheet';
import {StatusBar, View, Text } from 'react-native';
import { Colors, FAB, Button} from 'react-native-paper';
import { Layout } from '../Layout';
import Firebase, { database } from '../../models/Firebase';
import HyperLink from '../../components/HyperLink';

export class AreYouFirstTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{},
        isLoading:false,
    };
  }
  async answer(item){
      
      this.setState({isLoading:true})
      const user  = await Firebase.auth().currentUser
      this.setState({user:user})
      const Set   = await database.collection("users").doc(user.uid).set({
        quiz:{
          anyQuestions:item,
        },
      },{ merge: true })
      .then(res=>{
          this.props.navigation.navigate(item?"WhatPointUnknown":"DoYouExplainStaff")
      })
      .catch(error=>{
          
      })
      .then(error=>{
        this.setState({isLoading:false})
      })
    }
    _supportConnect(){

    }
  render() {
    const {t,navigation} = this.props;
    return (
        <Layout navigation={navigation} title={t('questions:questions.seven.title')}>
            <StatusBar hidden={true}/>
            <View style={{height:"100%"}}>
                <HyperLink onPress={navigation.navigate.bind(this,"FeesItems")}>{t('fees:title')}</HyperLink>
                <HyperLink onPress={navigation.navigate.bind(this,"AppFunctions")}>{t('functions:title')}</HyperLink>
                <HyperLink onPress={navigation.navigate.bind(this,"Others")}>{t('others:title')}</HyperLink>
            </View>
      </Layout>
    );
  }
}
export default withTranslation()(AreYouFirstTime);
