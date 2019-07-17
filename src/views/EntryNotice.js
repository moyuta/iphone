import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { RadioButton,Button, Colors,Card, Caption, Paragraph, Title, Subheading, ProgressBar, ActivityIndicator, Provider,Portal,Dialog } from 'react-native-paper';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Firebase, { database } from '../models/Firebase';
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';
import styles from '../Stylesheet';
import HyperLink from '../components/HyperLink';

export class Index extends Component {
    state = {
        user:null,
        modal:null,
        progress:0,
        alert:"",
        lockers:[],
        databaseCollection:"lockers",
    }
    componentDidMount(){
    }
    async GetUser() {
    }   
    async getUser(id){
    }
    async GetLockers() {


    }
    activateModal(id) {
        // let item = this.state.lockers[id];
        // console.log(item)
        this.setState({modal:true})
        // this.setState({modal:true,alert:item.user.nickname})
    }   
    deactivateModal() {
        this.setState({modal:false})
    }   
  render() {
      const {t,navigation} = this.props;
      const {lockers,progress} = this.state;
      const {navigate} = navigation;
    return (
      <View>
        <Layout title={t("entryNotice:title")} navigation={this.props.navigation}>
            <ScrollView>
                <View style={{padding:10}}>
                <TouchableNativeFeedback style={{marginTop:40,display:"flex",flexDirection:"row"}} onPress={navigate.bind(this,'EntranceRegister')}>
                    <Text style={{fontSize:18,width:"80%",color:Colors.blueGrey400}}>入店予告をする</Text>
                    <Text style={{fontSize:10,color:Colors.white,padding:10,backgroundColor:Colors.red600,borderRadius:100}}>100円割引</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback style={{marginTop:40,display:"flex",flexDirection:"row"}}  onPress={navigate.bind(this,'EntranceList')}>
                    <Text style={{fontSize:18,width:"80%",color:Colors.blueGrey400}}>既にした入店予告</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback style={{marginTop:40,display:"flex",flexDirection:"row"}} onPress={navigate.bind(this,'People')}>
                    <Text style={{fontSize:18,width:"80%",color:Colors.blueGrey400}}>みんなの入店予告を見る</Text>
                </TouchableNativeFeedback>                
                </View>
            </ScrollView>
        </Layout>
        <Provider>
        <Portal>
          <Dialog
             visible={this.state.modal}
             onDismiss={this.activateModal.bind(this)}>
            <Dialog.Content>
              <Paragraph>Nickname: Boy24</Paragraph>
              <Paragraph>Age: 25</Paragraph>
              <Paragraph>Height: 145 CMS</Paragraph>
              <Paragraph>Weight: 165 KG</Paragraph>
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