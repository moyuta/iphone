import React, { Component } from 'react';
import { View,ScrollView, Text,DatePickerAndroid,TextInput,DatePickerIOS,Animated,KeyboardAvoidingView } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { RadioButton,Button, Colors, Snackbar, FAB, Portal,Provider, IconButton } from 'react-native-paper';
import styles from '../Stylesheet';
import Firebase, { database } from '../models/Firebase';
import { TextInputMask } from 'react-native-masked-text'
import { Platform } from '@unimodules/core';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment"
export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            loginBtnBottom:new Animated.Value(30),
            nickname:"",
            height:"",
            weight:"",
            dob:"",
            email:"",
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
              this.idInput.focus();
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }        
    }
    snackClose = () =>{
        this.animateLoginBtn(30)
        this.setState({snackBar:false,snackMessage:null})
    }
    snackOpen = (message) =>{
        this.animateLoginBtn(60)
        this.setState({snackBar:true,snackMessage:message})
    }
    register  = async () => {
        const {t,navigation} = this.props;
        if(!this.state.nickname ||!this.state.idProof ||!this.state.height ||!this.state.weight ||!this.state.dob ||!this.state.email ||!this.state.password){
            this.snackOpen(t("register:incomplete"))
            return false;
        }

        this.setState({isloading:true})
        await Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(res=>{
            this.addUserInfo(res.user.uid)
        })
        .catch(error=>{
            this.snackOpen(error.message)
        })
        .then(res=>{
            this.setState({isloading:false})
        })

    }
    async addUserInfo(id){
        await database.collection("users")
        .doc(id)
        .set({
            height: this.state.height,
            weight: this.state.weight,
            nickname: this.state.nickname,
        })
        .then((res)=> {
            console.log(res)
        })
        .catch(error=> {
            this.setState({snackBar:true,snackMessage:message})
        });
    }
  render() {
    const {t,navigation} = this.props;
    return (
      <View>
        <Layout title={t("register:title")} navigation={navigation}>
            <KeyboardAvoidingView behavior="height" enabled>
                <View>
                    {/* Nickname */}
                    <View>
                        <Text style={[styles.formLabel]}>{t("register:nickname")}</Text>
                        <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="default" 
                                // autoFocus={true}
                                blurOnSubmit={false}
                                ref={(input) => { this.nicknameInput = input; }}
                                onSubmitEditing={() => { this.emailInput.focus(); }}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.nickname} 
                                disabled={this.state.isloading}
                                onChangeText={nickname => this.setState({ nickname })}/>
                        </View>

                        {/* Email */}
                        <View>
                        <Text style={[styles.formLabel]}>{t("register:email")}</Text>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="email-address" 
                                blurOnSubmit={false}
                                ref={(input) => { this.emailInput = input; }}
                                onSubmitEditing={() => { this.heightInput.focus(); }}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.email} 
                                disabled={this.state.isloading}
                                onChangeText={email => this.setState({ email })}/>
                        </View>


                        {/* Height */}
                        <View>
                        <Text style={[styles.formLabel]}>{t("register:height")}</Text>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="number-pad" 
                                blurOnSubmit={false}
                                ref={(input) => { this.heightInput = input; }}
                                onSubmitEditing={() => { this.weightInput.focus(); }}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.height} 
                                placeholder="cm"
                                disabled={this.state.isloading}
                                onChangeText={height => this.setState({ height })}/>
                        </View>

                        {/* Weight */}
                        <View>
                        <Text style={[styles.formLabel]}>{t("register:weight")}</Text>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="number-pad" 
                                blurOnSubmit={false}
                                ref={(input) => { this.weightInput = input; }}
                                onSubmitEditing={this.DatePickerOpenAndroid}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.weight} 
                                placeholder="kg"
                                disabled={this.state.isloading}
                                onChangeText={weight => this.setState({ weight })}/>
                        </View>

                        {/* Date of Birth */}
                        <View>
                            {
                                (Platform.OS === "ios") ? 
                                <View><DatePickerIOS date={this.state.dob} onDateChange={dob => this.setState({ dob })}/></View>:
                                <View>
                                    <Text style={[styles.formLabel]}>{t("register:selectdate")}</Text>
                                    <TextInput 
                                    style={[styles.formControl]}
                                    returnKeyType="next" 
                                    ref={(input) => { this.dobInput = input; }}
                                    onSubmitEditing={() => { this.idInput.focus(); }}
                                    clearButtonMode="while-editing"
                                    onFocus={this.DatePickerOpenAndroid}
                                    value={this.state.dob?moment(this.state.dob).format("YYYY-MM-DD"):null}
                                    editable={false}
                                    disabled={this.state.isloading}/>
                                </View>
                            }
                        </View>
                        {/* ID Proof */}
                        <View>
                        <Text style={[styles.formLabel]}>{t("register:password")}</Text>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="default" 
                                blurOnSubmit={false}
                                ref={(input) => { this.idInput = input; }}
                                onSubmitEditing={() => { this.password.focus(); }}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.idProof} 
                                disabled={this.state.isloading}
                                onChangeText={idProof => this.setState({ idProof })}/>
                        </View>
                        {/* ID Proof */}
                        <View>
                        <Text style={[styles.formLabel]}>{t("register:confirm_password")}</Text>
                            <TextInput 
                                style={[styles.formControl]}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="default" 
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                ref={(password) => { this.password = password; }}
                                onSubmitEditing={this.register}
                                returnKeyType="next" 
                                clearButtonMode="while-editing"
                                value={this.state.password} 
                                disabled={this.state.isloading}
                                onChangeText={password => this.setState({ password })}/>
                        </View>
                </View>
            </KeyboardAvoidingView>
        </Layout>
        
        <Snackbar visible={this.state.snackBar} onDismiss={this.snackClose}>{this.state.snackMessage}</Snackbar>
        <View style={styles.loginBtnContainer}>
            <FAB style={[styles.loginBtn,{bottom:this.state.loginBtnBottom}]} loading={this.state.isloading} color={Colors.white} disabled={this.state.isloading} icon="arrow-forward" label={t("register:title")} onPress={this.register}/>
        </View>
      </View>
    );
  }
}
export default withTranslation()(Login);