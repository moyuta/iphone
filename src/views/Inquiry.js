import React, { Component } from 'react';
import { View, Text,AsyncStorage,TextInput } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import {Snackbar, RadioButton,Button, Colors,Switch,Caption, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase, { database } from '../models/Firebase';
import styles from '../Stylesheet';

export class Index extends Component {
    state = {
        language:"",
        user:null,
        snackBar:false,
        snackBarMessage:false

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
  render() {
      const {t} = this.props;
      const {language,user} = this.state;
      if(user)
    return (
      <View>
        <Layout title={t("inquiry:title")} navigation={this.props.navigation}>
            <ScrollView>
            <View style={styles.main}>
                <View style={styles.informationMain}>
                <Caption>{t('inquiry:inqury')}</Caption>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    value={this.state.content}
                    style={[styles.formControl]}
                    onChangeText={content => this.setState({ content })}
                    />
                    <Button mode="contained" compact={true} onPress={this.props.navigation.navigate.bind(this,"maps")} style={{marginTop:30}} color={Colors.black}>{t('send')}</Button>
                    <TextInput
                    mode="outlined"
                    multiline={true}
                    value={this.state.content}
                    onChangeText={content => this.setState({ content })}
                    />
                    <View style={{marginTop:40}}>
                    <Text style={{fontSize:20,borderBottomColor:Colors.amber300,borderBottomWidth:2,textAlign:"center"}}>{t('inquiry:contact_fone')}</Text>
                    <Text style={{fontSize:30,textAlign:"center",color:Colors.teal800}}>TEL 00-0000-0000</Text>
                    </View>

                    <Button mode="contained" onPress={this.props.navigation.navigate.bind(this,"maps")} style={{marginTop:30}} color={Colors.black}>{t('send')}</Button>
                </View>
                </View>
            </ScrollView>
        </Layout>
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