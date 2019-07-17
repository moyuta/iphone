import React, { Component } from 'react';
import {StatusBar, View, Text } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import {Colors, FAB} from 'react-native-paper';
import {styles} from '../Stylesheet'

export class Questions extends Component {
  constructor(props){
    super(props);
    this.state = {
      step:0,
      first_time:null,
      hasQuestions:null,
      needStaffExplanation:null,
      checkedBeginManual:false,
    }
  }
  _next(){
    this.props.navigation.navigate("AreYouFirstTime")
  }

  render() {
    const {t,navigation} = this.props;
    return (
        <Layout navigation={navigation}>
            <StatusBar hidden={true}/>
            <View style={{height:"100%"}}>
            <View style={{justifyContent:"center",flex:1,alignContent:"center",}}>
              <Text style={[styles.questionaireQuestion]}>{t('questions:title')}</Text>
            </View>
            <FAB icon="arrow-forward" onPress={this._next.bind(this)} style={{position:"absolute",right:30,bottom:50,backgroundColor:Colors.pink400}}/>
          </View>
        </Layout>
    );
  }
}





export default withTranslation()(Questions);