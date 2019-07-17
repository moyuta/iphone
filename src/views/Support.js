import React, { Component } from 'react';
import { View } from 'react-native';
import { withTranslation } from 'react-i18next';
import {  ActivityIndicator, Text, Colors, Button } from 'react-native-paper';
import firebase from '../models/Firebase'
import { TextInput } from 'react-native';
import styles from '../Stylesheet';
import { Layout } from './Layout';

export class Support extends Component {
    constructor(props){
        super(props);
        this.state = {
            logginginMessage:"",
            snackBar:true,
            nickname:"",
            email:"",
            contents:"",
            user:{}
        }
    }
    async componentDidMount(){
        const {t,navigation} = this.props;
        const user = await firebase.auth().currentUser;
        if(user){
            this.setState({user:user,email:user.email})
        }
    }
    render() {
        const {t,navigation} = this.props;
        return (
            <Layout title={t("support:title")} navigation={navigation}>
                <View >
                    <View style={{padding:10}}>
                        <Text style={[styles.formLabel,styles.font]}>{t('support:nickname')}</Text>
                        <TextInput style={[styles.formControl]} onChange={(nickname)=>{this.setState({nickname:nickname})}}/>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={[styles.formLabel,styles.font]}>{t('common:email')}</Text>
                        <TextInput style={[styles.formControl]} onChange={(email)=>{this.setState({email:email})}}/>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={[styles.formLabel,styles.font]}>{t('support:enq_contents')}</Text>
                        <TextInput multiline={true} numberOfLines={4} style={[styles.formControl]} onChange={(contents)=>{this.setState({contents:contents})}}/>
                    </View>
                    <View style={{padding:10}}>
                        <Button color={Colors.deepPurple700} mode="contained">{t('common:ok')}</Button>
                    </View>
                </View>
            </Layout>
    );
  }
}
export default withTranslation()(Support);