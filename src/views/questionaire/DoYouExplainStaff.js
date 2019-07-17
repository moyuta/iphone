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
  async answer(item){
      
      this.setState({isLoading:true})
      const user  = await Firebase.auth().currentUser
      this.setState({user:user})
      const Set   = await database.collection("users").doc(user.uid).set({
        quiz:{
            isExplanationNeededByStaff:item,
        },
      },{ merge: true })
      .then(res=>{
          this.props.navigation.navigate(item?"StaffWillSpeak":"CheckedManual")
      })
      .catch(error=>{
          
      })
      .then(error=>{
        this.setState({isLoading:false})
      })
    }
  render() {
    const {t,navigation} = this.props;
    return (
        <Layout navigation={navigation}>
            <StatusBar hidden={true}/>
            <View style={{height:"100%"}}>
                <View style={{justifyContent:"center",flex:1,alignContent:"center",}}>
                    <Text style={[styles.questionaireQuestion]}>{t('questions:questions.four.title')}</Text>
                </View>
                <FAB 
                  disabled={this.state.isLoading}
                  loading={this.state.isLoading} 
                  icon="check" 
                  label={t('common:yes')} 
                  onPress={this.answer.bind(this,true)} 
                  style={{backgroundColor:Colors.blue900,position:"absolute",left:30,bottom:50}}/>
                <FAB 
                  disabled={this.state.isLoading}
                  loading={this.state.isLoading} 
                  icon="close" 
                  label={t('common:no')} 
                  onPress={this.answer.bind(this,false)} 
                  style={{backgroundColor:Colors.pink400,position:"absolute",right:30,bottom:50}}/>
            </View>
      </Layout>
    );
  }
}
export default withTranslation()(AreYouFirstTime);
