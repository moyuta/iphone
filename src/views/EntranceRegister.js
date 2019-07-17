import React, { Component } from 'react';
import { View, Text,TextInput,DatePickerIOS,DatePickerAndroid } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { Checkbox,Button, Colors,Caption, Paragraph, Dialog, Provider,Portal } from 'react-native-paper';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Firebase, { database } from '../models/Firebase';
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';
import styles from '../Stylesheet';
import HyperLink from '../components/HyperLink';
import { Platform } from '@unimodules/core';

export class Index extends Component {
    state = {
        user:null,
        modal:false,
        dob:new Date(),
        age:false,
        height:false,
        weight:false,
        twill:false,
    }
    componentDidMount(){
    }
    DatePickerOpenIOS = async () =>{
        this.setState({dob: newDate})
    }
    DatePickerOpenAndroid = async () =>{
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              this.setState({dob:new Date(year, month, day)})
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }        
    }
    activateModal() {
        this.setState({modal:true})
    }   
    deactivateModal() {
        this.setState({modal:false})
    }   
  render() {
      const {t,navigation} = this.props;
      const {lockers,modal,age,height,weight,twill} = this.state;
      const {navigate} = navigation;
    return (
      <View>
        <Layout title={t("entryRegister:title")} navigation={this.props.navigation}>
            <View style={{flex:1,alignContent:"flex-start",flexWrap:"wrap"}}>
                <View style={{alignItems:"baseline",flexDirection:"row",flexWrap:"wrap"}}>
                    <Checkbox.Android color={Colors.blue500} status={twill ? 'checked' : 'unchecked'} onPress={() => { this.setState({ twill: !twill }); }}/>
                    <Caption style={{fontSize: 18,}}>{t('entryRegister:apply_twill')}</Caption>
                </View>
                <View style={{alignItems:"baseline",flexDirection:"row",flexWrap:"wrap"}}>
                    <Checkbox.Android color={Colors.blue500} status={age ? 'checked' : 'unchecked'} onPress={() => { this.setState({ age: !age }); }}/>
                    <Caption style={{fontSize: 18,}}>{t('common:age')}</Caption>
                </View>
                <View style={{alignItems:"baseline",flexDirection:"row",flexWrap:"wrap"}}>
                    <Checkbox.Android color={Colors.blue500} status={height ? 'checked' : 'unchecked'} onPress={() => { this.setState({ height: !height }); }}/>
                    <Caption style={{fontSize: 18,}}>{t('common:height')}</Caption>
                </View>
                <View style={{alignItems:"baseline",flexDirection:"row",flexWrap:"wrap"}}>
                    <Checkbox.Android color={Colors.blue500} status={weight ? 'checked' : 'unchecked'} onPress={() => { this.setState({ weight: !weight }); }}/>
                    <Caption style={{fontSize: 18,}}>{t('common:weight')}</Caption>
                </View>
                <View>
                    {
                        (Platform.OS === "ios") ? 
                        <View><DatePickerIOS date={this.state.dob} onDateChange={dob => this.setState({ dob })}/></View>:
                        <View>
                            <TouchableNativeFeedback onPress={this.DatePickerOpenAndroid}>
                                <Text style={[styles.formLabel]}>{t("entryRegister:scheduled_date")}</Text>
                                <Text style={[styles.formLabel]}>{this.state.dob?moment(this.state.dob).format("YYYY-MM-DD"):null}</Text>
                            </TouchableNativeFeedback>
                        </View>
                    }                    
                </View>
                <View style={{marginBottom:10}}>
                   <TextInput multiline={true} numberOfLines={6} style={{backgroundColor:Colors.grey200,borderRadius:5}}/>                
                </View>
                <View>
                    <Button onPress={this.activateModal.bind(this)} mode="contained">OK</Button>                
                </View>
            </View>
        </Layout>
        <Provider>
        <Portal>
          <Dialog
             visible={this.state.modal}
             onDismiss={this.deactivateModal.bind(this)}>
            <Dialog.Content>
              <Paragraph>ありがとうございます．予告が完了しました．100円割引は自動で反映します．※実際の入店時刻が予定より前後90分以上ずれていると割引になりませんので，再度入店予告をお願いします．</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.deactivateModal.bind(this)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>        
        </Provider>         
      </View>
    );
  }
}
export default withTranslation()(Index);