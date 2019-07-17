import React, { Component } from 'react';
import { View, Text,Animated,KeyboardAvoidingView,TextInput} from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { RadioButton,Button, Colors,Caption, Snackbar, FAB, Portal,Provider } from 'react-native-paper';
import styles from '../Stylesheet';
import Firebase from '../models/Firebase';

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            loginBtnBottom:new Animated.Value(30),
            username:"",
            password:"",
            snackBar:false,
            snackMessage:null,
            isloading:false,
            open:false,
        }
    }
    animateLoginBtn = (val)=>{
        Animated.spring(this.state.loginBtnBottom,{toValue: val,duration: 150,}).start();        
    }
    snackClose = () =>{
        this.animateLoginBtn(30)
        this.setState({snackBar:false,snackMessage:null})
    }
    snackOpen = (message) =>{
        this.animateLoginBtn(60)
        this.setState({snackBar:true,snackMessage:message})
    }
    login  = async () => {
        const {t,navigation} = this.props;
        if(this.state.username ==""){
            this.snackOpen(t("login:errors.noEmail"))
            return false;
        }
        else if(this.state.password ==""){
            this.snackOpen(t("login:errors.noPassword"))
            return false;
        }

        this.setState({isloading:true})
        await Firebase.
            auth().
            signInWithEmailAndPassword(this.state.username, this.state.password).
            then(res=>{
                navigation.navigate("App")
            }).
            catch(error => {
                if(error.code =="auth/invalid-email"){
                    this.snackOpen(t("login:errors.invalid_email"))
                }
                else if(error.code =="auth/wrong-password"){
                    this.snackOpen(t("login:errors.invalid_password"))
                }
                else if(error.code =="auth/user-not-found"){
                    this.snackOpen(t("login:errors.user_not_found"))
                }
                else{
                    this.snackOpen(error.message)
                }
            }).
            then(()=>{
                this.setState({isloading:false})
            })
    }
  render() {
      const {t,navigation} = this.props;
    return (
      <View>
        <Layout title={t("login:title")} navigation={navigation}>
            <View style={{padding:10,flex:1,justifyContent:"center",alignContent:"center"}}>
                <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={{width:"100%",marginTop:10}}>
                            <Caption>{t("login:username")} </Caption>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="email-address" 
                                autoFocus={true}
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.passwordInput.focus(); }}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.username} 
                                disabled={this.state.isloading}
                                onChangeText={username => this.setState({ username })}/>
                        </View>
                        <View style={{width:"100%",marginTop:10}}>
                            <Caption>{t("login:password")}</Caption>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                secureTextEntry={true}
                                ref={(input) => { this.passwordInput = input; }}
                                returnKeyType="done" 
                                clearButtonMode="while-editing"
                                value={this.state.password} 
                                onSubmitEditing={this.login}
                                disabled={this.state.isloading}
                                onChangeText={password => this.setState({ password })}/>
                        </View>
                        <View style={{padding:5}}>
                            <Button compact={true} onPress={navigation.navigate.bind(this,'ForgotPassword')}>{t('common:help')}</Button>
                            <Button compact={true} onPress={navigation.navigate.bind(this,'Register')}>{t('register:title')}</Button>
                        </View>
                    </KeyboardAvoidingView>
                </View>
        </Layout>
        <Snackbar visible={this.state.snackBar} onDismiss={this.snackClose}>{this.state.snackMessage}</Snackbar>
        <View style={styles.loginBtnContainer}>
            <FAB style={[styles.loginBtn,{bottom:this.state.loginBtnBottom}]} loading={this.state.isloading} color={Colors.white} disabled={this.state.isloading} icon="fingerprint" label={t("login:title")} onPress={this.login}/>
        </View>
      </View>
    );
  }
}
export default withTranslation()(Login);