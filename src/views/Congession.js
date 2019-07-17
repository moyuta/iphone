import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { RadioButton,Button, Colors,Card, Caption, Paragraph, Title, Subheading } from 'react-native-paper';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Firebase, { database } from '../models/Firebase';
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';
import styles from '../Stylesheet';

export class Index extends Component {
    state = {
        user:null,
        stamps:[]
    }
    componentDidMount(){
       
    }
    async GetUser() {
       const user = await Firebase.auth().currentUser;
       this.setState({user:user});
    }   
    async GetStamps() {

    }   
  render() {
      const {t,navigation} = this.props;
      const {navigate} = navigation;
    return (
      <View>
        <Layout title={t("congession:title")} navigation={this.props.navigation}>
            <ScrollView>
                <View style={[styles.row]}>
                    <View style={[styles.col2]}>
                        <Card>
                            <Card.Content>
                                <Subheading style={{fontSize:10,color:Colors.grey600}}>{t('congession:title')}</Subheading>
                                <Title style={{color:Colors.blue800}}>0.00%</Title>
                            </Card.Content>
                        </Card>
                    </View>                    
                    <View style={[styles.col2]}>
                        <Card>
                            <Card.Content>
                                <Subheading style={{fontSize:10,color:Colors.grey600}}>{t('congession:people_stays')}</Subheading>
                                <Title style={{color:Colors.blue800}}>20 {t('congession:people')}</Title>
                            </Card.Content>
                        </Card>
                    </View>                    
                    <View style={[styles.col1]}>
                      <Caption style={{fontSize:13,textAlign:"center"}}>{t('congession:entry_notice')}</Caption>
                    </View>                    
                    <View style={[styles.col1]}>
                      <TouchableNativeFeedback onPress={()=>{navigate("InStore")}} >
                      <Card>
                        <Card.Content>
                          <Title style={{textAlign:"center",color:Colors.indigo500}}>{t('common:in_store_info')}</Title>
                        </Card.Content>
                      </Card>
                      </TouchableNativeFeedback>
                    </View>                    
                    <View style={[styles.col2]}>
                      <Button onPress={()=>{navigate("EntryNotice")}} dense mode="contained" color={Colors.purple500}>{t('congession:entry_notice_title')}</Button>
                    </View>                    
                    <View style={[styles.col2]}>
                      <Button onPress={()=>{navigate("InStore")}} dense mode="contained" color={Colors.purple500}>{t('congession:everyones_entry_notice_title')}</Button>
                    </View>                    
                </View>
            </ScrollView>
        </Layout>
      </View>
    );
  }
}
export default withTranslation()(Index);