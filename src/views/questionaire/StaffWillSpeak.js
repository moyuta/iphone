import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {styles} from '../../Stylesheet';
import {StatusBar, View, Text } from 'react-native';
import { Colors, FAB} from 'react-native-paper';
import { Layout } from '../Layout';
import Firebase, { database } from '../../models/Firebase';

export class AreYouFirstTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{},
        isLoading:false,
    };
  }
  async answer(){this.props.navigation.navigate("CheckedManual")}
  render() {
    const {t,navigation} = this.props;
    return (
        <Layout navigation={navigation}>
            <StatusBar hidden={true}/>
            <View style={{height:"100%"}}>
                <View style={{justifyContent:"center",flex:1,alignContent:"center",}}>
                    <Text style={[styles.questionaireQuestion]}>{t('questions:questions.five.title')}</Text>
                    <Text style={[styles.font,{fontSize:13,color:Colors.grey600,textAlign:"center"}]}>{t('questions:questions.five.subtitle')}</Text>
                </View>
                <FAB 
                  disabled={this.state.isLoading}
                  loading={this.state.isLoading} 
                  icon="arrow-forward" 
                  onPress={this.answer.bind(this)} 
                  style={{backgroundColor:Colors.pink400,position:"absolute",right:30,bottom:50}}/>
            </View>
      </Layout>
    );
  }
}
export default withTranslation()(AreYouFirstTime);
