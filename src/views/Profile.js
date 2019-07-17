import React, { Component } from 'react';
import {TextInput, View, Text,AsyncStorage } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { Switch,Button, Colors, Snackbar, ActivityIndicator, Divider,Subheading, Caption } from 'react-native-paper';
import Firebase,{database} from '../models/Firebase';

import styles from '../Stylesheet';
import { ScrollView } from 'react-native-gesture-handler';

export class Index extends Component {
    state = {
        user:null,
        snackBar:false,
        password:"",
        snackBarMessage:false
    }
    componentDidMount(){
        this.userProfile()
    }
    async userProfile() {
        let user = await Firebase.auth().currentUser
        user.data = await database.collection("users").doc(user.uid).get().then(res=>res.data()).catch(error=>error);
        this.setState({user:user})
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
    _agePublic() {
        const {user} = this.state;
        user.data.agePublic = !user.data.agePublic;
        this.setState({user:user});
        this.UpdateProfile();
    }
    _heightPublic() {
        const {user} = this.state;
        user.data.heightPublic = !user.data.heightPublic;
        this.setState({user:user});
        this.UpdateProfile();
    }
    _adaptivePublic() {
        const {user} = this.state;
        user.data.adaptivePublic = !user.data.adaptivePublic;
        this.setState({user:user});
        this.UpdateProfile();
    }
    _weightPublic() {
        const {user} = this.state;
        user.data.weightPublic = !user.data.weightPublic;
        this.setState({user:user});
        this.UpdateProfile();
    }

  render() {
      const {t} = this.props;
      const {language} = this.state;
    return (
      <View>
        <Layout title={t("profile:title")} navigation={this.props.navigation}>
            {
                this.state.user?
                <View>
                    <ScrollView>

                    <View style={[{marginTop:10}]}>
                        <Text style={[styles.formLabel]}>{t('register:nickname')}</Text>
                        <TextInput style={[styles.formControl]} value={this.state.user.data.nickname} onChange={(nickname)=>this.setState({user:{data:{nickname:nickname}}})}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Text style={[styles.formLabel]}>{t('register:email')}</Text>
                        <TextInput keyboardType="email-address" style={[styles.formControl]} value={this.state.user.email} onChange={(email)=>{this.setState({user:{email:email}});}}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Button onPress={this.UpdateProfile} mode="contained" color={Colors.blue900}>Update</Button>
                    </View>
                    <Divider/>
                    <View style={[{marginTop:10}]}>
                        <Subheading style={{color:Colors.grey700}}>{t('profile:set_public_info')}</Subheading>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Caption>{t('common:age')}</Caption>
                        <Switch color={Colors.blue700} value={this.state.user.data.agePublic} onValueChange={this._agePublic.bind(this)}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Caption>{t('common:height')}</Caption>
                        <Switch color={Colors.blue700} value={this.state.user.data.heightPublic} onValueChange={this._heightPublic.bind(this)}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Caption>{t('common:weight')}</Caption>
                        <Switch color={Colors.blue700} value={this.state.user.data.weightPublic} onValueChange={this._weightPublic.bind(this)}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Caption>{t('profile:set_adaptive_info')}</Caption>
                        <Text>{t('profile:adaptive_notice')}</Text>
                        <Switch color={Colors.blue700} value={this.state.user.data.adaptivePublic} onValueChange={this._adaptivePublic.bind(this)}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Caption>{t('register:password')}</Caption>
                        <TextInput style={[styles.formControl]} value={this.state.password} onChange={(password)=>this.setState({password})}/>
                    </View>
                    <View style={[{marginTop:10}]}>
                        <Caption>Confirm {t('register:password')}</Caption>
                        <TextInput style={[styles.formControl]} value={this.state.password} onChange={(password)=>this.setState({password})}/>
                    </View>
                </ScrollView>
                </View>
                :<ActivityIndicator/>
            }
        </Layout>
        <Snackbar visible={this.state.snackBar} onDismiss={() => this.setState({ snackBar: false })}>{this.state.snackBarMessage}</Snackbar>
      </View>
    );
  }
}
export default withTranslation()(Index);