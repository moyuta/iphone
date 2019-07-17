import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { RadioButton,Button, Colors, Caption, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
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
      const {t} = this.props;
    return (
      <View>
        <Layout title={t("tandc:title")} navigation={this.props.navigation}>
            <ScrollView>
  <Text>

入店予告機能
このアプリでは、ご自身の入店予告をするだけでなく、他の方の入店予告情報も一括で閲覧することが可能です。気になる人がいる時間を狙って入店予告＆割引をゲットしよう！
店内確認機能
店内に何人いるのか、どんな人がいるのか。…てかイケメンいるのか？を確認できる業界初の機能！暇があったら覗いてみよう！
混雑状況確認機能
「今どのくらい埋まっているか」を一目で確認できる機能です。
スタンプ機能
来店ごとにスタンプが溜まります！15個集めて無料券をゲットしよう！
滞在時間表示機能
入店からの時間を表示します。一発入魂割などにご使用ください。
来客アラート機能
別のフロアにいても新たな来客を見逃しません。
掲示板機能
疑問点を他の人に聞いてみたり、一緒に行く人を募ったり、連絡先を交換しそびれたあの人とまた会いたい…。など各種掲示ができます。

                </Text>
            </ScrollView>
        </Layout>
      </View>
    );
  }
}
export default withTranslation()(Index);