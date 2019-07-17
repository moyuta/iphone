import React, { Component } from 'react';
import { View, Text,TextInput,DatePickerIOS,DatePickerAndroid } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { Checkbox,Button, Colors,Caption, Paragraph, Dialog, Provider,Portal,List } from 'react-native-paper';
import { TouchableNativeFeedback, ScrollView } from 'react-native-gesture-handler';
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
      const items = Array.from(Array(10).keys());
      const times = 17.00;
    return (
      <View>
        <Layout title="予告者一覧" navigation={this.props.navigation}>
            <ScrollView>
            <Text style={{color:Colors.blueGrey700,padding:10}}>予告者一覧</Text>
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>1</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>2</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>3</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>4</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>5</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>6</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>7</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>8</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>9</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>10</Text>}
                />
                <List.Item
                    title="*******************"
                    description="10KG,126CMS"
                    left={props => <Text>11</Text>}
                />
            </ScrollView>
        </Layout>      
      </View>
    );
  }
}
export default withTranslation()(Index);