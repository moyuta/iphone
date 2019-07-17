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
class StampItem extends Component {
    render(){
        const {item} = this.props
        return (
                <View style={[this.props.active?{backgroundColor:Colors.green500}:null,{padding:20,borderRadius:5,justifyContent:"center"}]}>
                    <Image source={require('../../assets/images/stamp.png')} style={{width:30,height:30,paddingLeft:10,}}/>
                    <Text style={{color:Colors.white,fontSize:10,textAlign:"center"}}>{moment(item.date.seconds*1000).format("DD/MM/YYYY")}</Text>
                </View>
            )
    }

}


export class Index extends Component {
    state = {
        user:null,
        stamps:[]
    }
    componentDidMount(){
       this.GetUser().then(()=>this.GetStamps())
    }
    async GetUser() {
       const user = await Firebase.auth().currentUser;
       this.setState({user:user});
    }   
    async GetStamps() {
        const {user} = this.state;
        let collect =[];
        await database
        .collection('users')
        .doc(user.uid)
        .collection('stamps')
        .get()
        .then(res=>{
            res.forEach(item=>{
                collect.push(item.data())
            })
        })
        .catch(error=>{
            alert(error);
        })
        .then(()=>{
            this.setState({stamps:collect});
        })

    }   
  render() {
      const {t} = this.props;
      const {stamps} = this.state;
      const active = stamps.filter(item=>!item.redeemed?item:null)
      const inactive = stamps.filter(item=>item.redeemed?item:null)
    return (
      <View>
        <Layout title={t("stamp:title")} navigation={this.props.navigation}>
            <ScrollView>
                <Caption>{t('common:active')}</Caption>
                    {
                        active.length?
                        <View style={[styles.row]}>
                            {
                                active.map(item=>{
                                    return (
                                        <View style={[styles.col4]}>
                                            <StampItem active={true} item={item} key={item.start}/>
                                        </View>
                                    )
                                })
                            }
                        </View>:
                        <Caption>No {t('common:active')} Stamps Available</Caption>
                    }
                    <View style={{paddingTop:30}}>
                <Caption>{t('common:inactive')}</Caption>
                    {
                        inactive.length?
                        <View style={[styles.row]}>
                            {
                                inactive.map(item=>{
                                    return (
                                        <View style={[styles.col4]}>
                                            <StampItem active={false} item={item} key={item.start}/>
                                        </View>
                                    )
                                })
                            }
                        </View>:
                        <Caption>No {t('common:inactive')} Stamps Available</Caption>
                    }
                    </View>
                    <View>
                        <Paragraph style={{color:Colors.grey700}}>{t('stamp:one_stamp_per_visit')}</Paragraph>
                        <Paragraph style={{color:Colors.grey700}}>{t('stamp:save_15')}</Paragraph>
                        <Paragraph style={{color:Colors.grey700}}>{t('stamp:no_expiry')}</Paragraph>
                    </View>
            </ScrollView>
        </Layout>
      </View>
    );
  }
}
export default withTranslation()(Index);