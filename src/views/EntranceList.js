import React, { Component } from 'react';
import { View, Text,TextInput,DatePickerIOS,DatePickerAndroid } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { Checkbox,Button, Colors,Caption, Paragraph, Dialog, Provider,Portal,DataTable } from 'react-native-paper';
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
        <Layout title={t("entryList:title")} navigation={this.props.navigation}>
            <View>
                <ScrollView>
                    <Button></Button>
                    <DataTable>
                        {
                            items.map((i,int)=>{
                                return (
                                      <TouchableNativeFeedback onPress={()=>navigate("People")}>
                                    <DataTable.Row key={int}>

                                        <DataTable.Cell numeric style={{backgroundColor:Colors.blue300,padding:5}}>
                                            <Text style={{color:Colors.white,}}>{times+int}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>{Math.floor(Math.random() * 10)}人</DataTable.Cell>
                                        <DataTable.Cell numeric>{Math.floor(Math.random() * 10) /100 *60}%</DataTable.Cell>
                                    </DataTable.Row>                                    
                                      </TouchableNativeFeedback>
                                )
                            })
                        }
                    </DataTable>
                </ScrollView>
            </View>
        </Layout>      
      </View>
    );
  }
}
export default withTranslation()(Index);