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
        this.GetLockers();
    }
    async GetUser() {
       const user = await Firebase.auth().currentUser;
       this.setState({user:user});
    }   
    async getUser(id){
       const user = await database.collection('users').doc(id).get().then(res=>res.data()).catch(error=>{})
       return user;
    }
    async GetLockers() {
       const {databaseCollection} = this.state;
       const items =[];
       const collection           = database.collection(databaseCollection)
       this.setState({progress:25})
        await collection.get()
                    .then(res=>{
                        res.forEach(element=>{
                            let i = element.data();
                            i.user = this.getUser(element.user)
                            items.push(i)
                            this.setState({progress:50})
                    }
                )
            }
        )
        .catch(error=>alert(error))
        .then(()=>{this.setState({lockers:items,progress:0})})

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
      const rooms      = Array.from(Array(60).keys())
    return (
      <View>
        <Layout title={t("in_store:title")} navigation={this.props.navigation}>
            <Caption>{t('in_store:subtitle')}</Caption>
            {progress?<ActivityIndicator color={Colors.blue500} />:null}
            <ScrollView>
                <View style={[styles.row]}>
                    {
                        rooms.map(room=>{
                            const isActive = lockers.filter(re=>re.locker===room+1).length;
                            return (
                                <View key={room} style={[styles.col5,{borderWidth:0.51,borderColor:Colors.grey400}]}>
                                    <TouchableNativeFeedback onPress={isActive?this.activateModal.bind(this,room):null}>
                                        <Card style={[isActive?{backgroundColor:Colors.red600}:null]}>
                                            <Card.Content>
                                                <Title style={[{color:isActive?Colors.white:Colors.grey600,textAlign:"center",fontSize: 13,}]}>{room+1}</Title>
                                            </Card.Content>
                                        </Card>
                                    </TouchableNativeFeedback>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </Layout>
        <Provider>
        <Portal>
          <Dialog
             visible={this.state.modal}
             onDismiss={this.activateModal.bind(this)}>
            <Dialog.Content>
              <Paragraph>ニックネーム: Boy24</Paragraph>
              <Paragraph>年齢: 25</Paragraph>
              <Paragraph>身長: 145 {t('register:cms')}</Paragraph>
              <Paragraph>体重: 165 {t('register:kg')}</Paragraph>
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