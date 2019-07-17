import React, { Component } from 'react';
import { View, Text,AsyncStorage } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import {Snackbar, RadioButton,Button, Colors,Switch,Caption,Dialog, Portal, ActivityIndicator, Provider, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase, { database } from '../models/Firebase';
import HyperLink from '../components/HyperLink';
import styles from '../Stylesheet';

export class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            language:"",
            user:null,
            askLogout:false,
            askResign:false,
            snackBar:false,
            snackBarMessage:false
    
        }        
    }
    componentDidMount(){
        let lang = this.props.i18n.language
        this.setState({language:lang})
        this.userProfile()
    }
    async userProfile() {
        let user = await Firebase.auth().currentUser
        user.data = await database.collection("users").doc(user.uid).get().then(res=>res.data()).catch(error=>error);
        this.setState({user:user})
    }       
    messageFromStore() {
        const {user} = this.state;
        user.data.messageFromStore = !user.data.messageFromStore;
        this.setState({user:user});
        this.UpdateProfile();
    }        
     _userEntryNotification() {
        const {user} = this.state;
        user.data.userEntryNotification = !user.data.userEntryNotification;
        this.setState({user:user});
        this.UpdateProfile();
    }        
     async UpdateProfile() {
        const {user} = this.state;
        await database
        .collection("users")
        .doc(user.uid)
        .set(user.data,{merge:true})
        .then(res=>this._snackMessage("Updated"))
        .catch(error=>{this._snackMessage(error.message)});
    }
    askLogout(){
        const {askLogout} = this.state;
        this.setState({askLogout:!askLogout})
    }
    askResign(){
        const {askResign} = this.state;
        this.setState({askResign:!askResign})
    }
    _snackMessage(message){
        this.setState({snackBar:true,snackBarMessage:message})
    }      
    async onChangeLang(lang) {
        this.props.i18n.changeLanguage(lang);
        try {
            await AsyncStorage.setItem('@APP:languageCode',lang);
            this.setState({language:lang})
        } catch (error) {
            console.log(` Unable to Change Language: ${error}`);
        }
    }      
    async logout() {
        await Firebase.auth().signOut();
    }      
    async resign() {
        const user = await Firebase.auth().currentUser
        user.delete().then(()=> {
            this.logout();
          }).catch((error)=> {
            this._snackMessage(error.message)
          });
    }
  render() {
      const {t} = this.props;
      const {language,user} = this.state;
      if(user)
    return (
      <View style={{flex:1}}>
        <Layout title={t("settings:title")} navigation={this.props.navigation}>              
            <ScrollView>
            <View style={{marginTop:10,padding:1}}>
                <View style={{padding:10}}>
                    <Text style={[{color:Colors.grey500}]}>{t('common:language')}</Text>
                </View>
                <View style={{display:"flex",alignItems:"baseline",flex:1,flexDirection:"row"}}>
                    <RadioButton.Android color={Colors.blue800} value="en" status={language === 'en' ? 'checked' : 'unchecked'} onPress={this.onChangeLang.bind(this,'en')}/>
                    <Text style={{width:"50%",color:Colors.grey700}}>{t('common:english')}</Text>
                </View>
                <View style={{display:"flex",alignItems:"baseline",flex:1,flexDirection:"row"}}>
                    <RadioButton.Android color={Colors.blue800} value="ja" status={language === 'ja' ? 'checked' : 'unchecked'} onPress={this.onChangeLang.bind(this,'ja')}/>
                    <Text style={{width:"50%",color:Colors.grey700}}>{t('common:japaneese')}</Text>
                </View>
                <View style={{display:"flex",alignItems:"baseline",flex:1,flexDirection:"row"}}>
                    <RadioButton.Android color={Colors.blue800} value="ch" status={language === 'ch' ? 'checked' : 'unchecked'} onPress={this.onChangeLang.bind(this,'ch')}/>
                    <Text style={{width:"50%",color:Colors.grey700}}>{t('common:chineese')}</Text>
                </View>
                <View style={{display:"flex",alignItems:"baseline",flex:1,flexDirection:"row"}}>
                    <Text style={[{color:Colors.grey500}]}>{t('settings:notification_settings')}</Text>
                </View>
                <View style={[{flex:1,width:"100%",marginTop:10}]}>
                    <Caption>{t('settings:when_user_enters')}</Caption>
                    <Switch color={Colors.blue700} value={user.data.userEntryNotification} onValueChange={this._userEntryNotification.bind(this)}/>
                </View>                
                <View style={[{flex:1,width:"100%",marginTop:10}]}>
                    <Caption>{t('settings:messageFromStore')}</Caption>
                    <Switch color={Colors.blue700} value={user.data.messageFromStore} onValueChange={this.messageFromStore.bind(this)}/>
                </View>                
                <View style={{display:"flex",alignItems:"baseline",flex:1,flexDirection:"row"}}>
                    <HyperLink onPress={this.askLogout.bind(this)}>{t('common:logout')}</HyperLink>
                </View>
                <View style={{display:"flex",alignItems:"baseline",flex:1,flexDirection:"row"}}>
                    <HyperLink onPress={this.askResign.bind(this)}>{t('common:resign')}</HyperLink>
                </View>
            </View>
            </ScrollView>
        </Layout>
        <Provider>
            <Portal >
            <Dialog
                visible={this.state.askLogout}
                onDismiss={this.askLogout.bind(this)}>
                <Dialog.Title style={[styles.font]}>{t('common:confirm_logout')}</Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={this.logout.bind(this)}>{t('common:confirm')}</Button>
                    <Button onPress={this.askLogout.bind(this)}>{t('common:cancel')}</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog
                visible={this.state.askResign}
                onDismiss={this.askResign.bind(this)}>
                <Dialog.Title style={[styles.font]}>{t('common:confirm_resign')}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{t('common:resign_notice')}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={this.resign.bind(this)}>{t('common:confirm')}</Button>
                    <Button onPress={this.askResign.bind(this)}>{t('common:cancel')}</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </Provider>
        <Snackbar visible={this.state.snackBar} onDismiss={() => this.setState({ snackBar: false })}>{this.state.snackBarMessage}</Snackbar>
      </View>
    );
    else
    return (
        <View>
            <ActivityIndicator/>
        </View>
    )
  }
}
export default withTranslation()(Index);