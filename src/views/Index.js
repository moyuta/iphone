import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { List, Title, Paragraph, Colors } from 'react-native-paper';
import {styles} from '../Stylesheet'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
export class Index extends Component {

  static navigationOptions = {
    title: 'Home',
  };
  render() {
      const {t,navigation} = this.props;
    return (
      <View>
        <Layout navigation={this.props.navigation}>
          <View style={{paddingTop: 40,}}/>
          <ScrollView>
          <View style={[styles.row]}>
            <View style={[styles.col1,{padding:10,borderColor:Colors.blue100,borderWidth:2}]}>
                <Title style={[{color:Colors.blue900},styles.font]}>{t('index:event_style')}</Title>
                <Paragraph style={{color:Colors.blue900,fontSize:13}}>みんなが参加することを確認するためのイベント。 これは毎週木曜日にスタンプを持っているすべてのメンバーのためにホストされます</Paragraph>
            </View>
            <View style={[styles.col1,{paddingVertical:30,marginTop:20}]}>
                <Title style={[{textAlign:"center",color:Colors.grey400,fontSize: 13},styles.font]}>{t('index:business_hours')}</Title>
                <Title style={[{textAlign:"center",color:Colors.blue900,fontSize: 26},styles.font]}>14:30 - 3:40</Title>
            </View>
            <View style={[styles.col1,{marginTop:20}]}>
            <List.Item 
              onPress={navigation.navigate.bind(this,'Fees')} 
              style={{borderBottomWidth:0.5,borderColor:Colors.grey400 }} 
              title={t('common:fees')} 
              right={props => <List.Icon {...props} icon="chevron-right" />}
              left={props => <List.Icon {...props} color={Colors.blue800} icon="attach-money" />}
              />
            <List.Item 
              onPress={navigation.navigate.bind(this,'Login')} 
              style={{borderBottomWidth:0.5,borderColor:Colors.grey400 }} 
              title={t('common:login')} 
              right={props => <List.Icon {...props} icon="chevron-right" />}
              left={props => <List.Icon {...props} color={Colors.blue800} icon="fingerprint" />}
              />
            <List.Item 
              onPress={navigation.navigate.bind(this,'Register')} 
              style={{borderBottomWidth:0.5,borderColor:Colors.grey400 }} 
              title={t('common:signup')} 
              right={props => <List.Icon {...props} icon="chevron-right" />}
              left={props => <List.Icon {...props} color={Colors.blue800} icon="group" />}
              />
            <List.Item 
              onPress={navigation.navigate.bind(this,'Support')} 
              style={{borderBottomWidth:0.5,borderColor:Colors.grey400 }} 
              title={t('common:support_enquiry')} 
              right={props => <List.Icon {...props} icon="chevron-right" />}
              left={props => <List.Icon {...props} color={Colors.blue800} icon="live-help" />}
              />
            </View>
          </View>
          </ScrollView>
        </Layout>
      </View>
    );
  }
}
export default withTranslation()(Index);