import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {styles} from '../../Stylesheet';
import {StatusBar, View, Text } from 'react-native';
import { Colors, FAB, Button} from 'react-native-paper';
import { Layout } from '../Layout';
import Firebase, { database } from '../../models/Firebase';
import HyperLink from '../../components/HyperLink';
import {manualItems} from "../../models/manual"
import { ScrollView } from 'react-native-gesture-handler';
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
            <Layout navigation={navigation} title={t('manual:title')}>
            <StatusBar hidden={true}/>
                <ScrollView enabled={true} >
                    <View style={{marginBottom:300}}>
                            <Text style={{padding:15,fontSize:13,color:Colors.blueGrey400,textAlign:"justify"}}>{t('manual:contNe')}</Text>
                            {manualItems.map(res=>{
                                let item = res.items.map(i=><Text key={i} style={{color:Colors.blueGrey700,fontSize:13,textAlign:"justify"}}>{t(`manual:guide.${i}`)}</Text>)
                                return (
                                    <View style={{paddingTop:15,padding:10,}} key={res.title}>
                                        <Text style={{fontSize:16,color:Colors.blue600}}>{t(`manual:guide.${res.title}`)}</Text>
                                        {item}
                                    </View>
                                )
                            })}
                            <Text>{t('manual:guide.thankYou')}</Text>
                    </View>
                </ScrollView>
            </Layout>
    );
  }
}
export default withTranslation()(AreYouFirstTime);
