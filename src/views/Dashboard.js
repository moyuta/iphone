import React, { Component } from 'react';
import { View, Text,ScrollView,Dimensions ,Image} from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout as Lax } from './Layout';
import { Title, Colors, Card, ActivityIndicator, } from 'react-native-paper';
import {styles} from '../Stylesheet'
import firebase, { database } from '../models/Firebase'

import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { MapView } from 'expo';
import HyperLink from '../components/HyperLink';

class  Layout extends Component{
  render(){
      return (
      <View>
        <Lax title={this.props.title}>
          <ScrollView>
              {this.props.children}
          </ScrollView>
        </Lax>
      </View>
    )
  }
}

export class Dashboard extends Component {
  FirstRoute = () => {
    const {t,navigation}= this.props;
    return (
        <Layout title={t('dashboard:tabs.tabone.title')}>
          <Card>
            <Card.Content>
              <Text>{t('dashboard:tabs.tabone.display')}</Text>
            </Card.Content>
            <Card.Content>
              <Title style={[{color:Colors.grey400,fontSize: 13},styles.font]}>{t('index:business_hours')}</Title>
              <Title style={[{color:Colors.blue900,fontSize: 26},styles.font]}>14:30 - 3:40</Title>
            </Card.Content>
          </Card>
          <View style={{paddingBottom:50}}>
          <View style={[styles.row]}>
            <View style={[styles.col2]}>
              <TouchableNativeFeedback onPress={alert.bind(this,"Ok")} style={{marginBottom:5}}>
              <Card style={{backgroundColor:Colors.blue900}}>
                <Card.Content>
                  <Ionicons style={{textAlign:"center"}} name="md-pin" size={32} color={Colors.white} />
                  <Text style={[styles.font,{color:Colors.white,textAlign:"center"}]} >{t('dashboard:tabs.tabone.access')}</Text>
                </Card.Content>
              </Card>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"Manual")} style={{marginBottom:5}}>
              <Card style={{backgroundColor:Colors.blue900}}>
                <Card.Content>
                  <Ionicons style={{textAlign:"center"}} name="md-book" size={32} color={Colors.white} />
                  <Text style={[styles.font,{color:Colors.white,textAlign:"center"}]} >{t('manual:title')}</Text>
                </Card.Content>
              </Card>
              </TouchableNativeFeedback>              
            </View>
            <View style={[styles.col2]}>
              <Card style={{marginBottom:10}}>
                <Card.Content>
                  <Text style={[styles.font,{color:Colors.blue800,fontSize:10}]}>{t('dashboard:tabs.tabone.stayTime')}</Text>
                  <Text style={[styles.font,{color:Colors.blue800,fontSize:25}]} >00:00 <Text style={[styles.font,{color:Colors.blue800,fontSize:10}]} >/ 00:00</Text></Text>                  
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Text style={[styles.font,{color:Colors.blue800,fontSize:10}]} >{t('dashboard:tabs.tabone.currentFee')}</Text>
                  <Text style={[styles.font,{color:Colors.blue800,fontSize:25}]} >0.00 {t('common:yen')}</Text>
                </Card.Content>
              </Card>
            </View>
            <View style={[styles.col3]}>
            <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"Settings")} style={{marginBottom:5}}>
              <Card style={{backgroundColor:Colors.blue900}}>
                <Card.Content>
                  <Ionicons style={{textAlign:"center"}} name="md-settings" size={32} color={Colors.white} />
                  <Text style={[styles.font,{color:Colors.white,textAlign:"center"}]} >{t('settings:title')}</Text>
                </Card.Content>
              </Card>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
            <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"FeesItems")} style={{marginBottom:5}}>
              <Card style={{backgroundColor:Colors.blue900}}>
                <Card.Content>
                  <Ionicons style={{textAlign:"center"}} name="md-cash" size={32} color={Colors.white} />
                  <Text style={[styles.font,{color:Colors.white,textAlign:"center"}]} >{t('fees:title')}</Text>
                </Card.Content>
              </Card>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
            <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"Profile")} style={{marginBottom:5}}>
              <Card style={{backgroundColor:Colors.blue900}}>
                <Card.Content>
                  <Ionicons style={{textAlign:"center"}} name="md-person" size={32} color={Colors.white} />
                  <Text style={[styles.font,{color:Colors.white,textAlign:"center"}]} >{t('profile:title')}</Text>
                </Card.Content>
              </Card>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"Stamps")} style={{marginBottom:5,padding:10,width:"100%",position:"relative"}}>
                <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                  <Image source={require('../../assets/images/stamp.png')} style={{width:30,height:30,marginBottom:5}}/>
                  <Text style={[styles.font,{textAlign:"center"}]} >{t('stamp:title')}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"Inquiry")} style={{marginBottom:5,padding:10,width:"100%",position:"relative"}}>
                <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <Ionicons style={{textAlign:"center",paddingBottom:5}} name="md-help-circle-outline" size={32} color={Colors.black} />
                  <Text style={[styles.font,{textAlign:"center"}]} >{t('inquiry:title')}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"TermsAndConditions")} style={{marginBottom:5,padding:10,width:"100%",position:"relative"}}>
                <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <Ionicons style={{textAlign:"center",paddingBottom:5}} name="md-globe" size={32} color={Colors.black} />
                  <Text style={[styles.font,{textAlign:"center"}]} >{t('tandc:title')}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"Congession")} style={{marginBottom:5,padding:10,width:"100%",position:"relative"}}>
                <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <Ionicons style={{textAlign:"center",paddingBottom:5}} name="md-people" size={32} color={Colors.black} />
                  <Text style={[styles.font,{textAlign:"center"}]} >{t('congession:title')}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"InStore")} style={{marginBottom:5,padding:10,width:"100%",position:"relative"}}>
                <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <Ionicons style={{textAlign:"center",paddingBottom:5}} name="md-list" size={32} color={Colors.black} />
                  <Text style={[styles.font,{textAlign:"center"}]} >{t('availablity:title')}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col3]}>
              <TouchableNativeFeedback onPress={navigation.navigate.bind(this,"EntryNotice")} style={{marginBottom:5,padding:10,width:"100%",position:"relative"}}>
                <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <Ionicons style={{textAlign:"center",paddingBottom:5}} name="md-log-in" size={32} color={Colors.black} />
                  <Text style={[styles.font,{textAlign:"center"}]} >{t('arrival:title')}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          </View>
        </Layout>
      )
  };
  
  SecondRoute = () => {
    const {t}= this.props;
    return (
        <Layout title={t('dashboard:tabs.tabtwo.title')}>
          
        </Layout>
      )
  };
  MapRoute = () => {
    const {t}= this.props;
    return (
        <Layout title={t('dashboard:tabs.tabthree.title')}>
          <View style={{paddingBottom: 120,}}>
          <ScrollView>

          <MapView
              style={{ width:Dimensions.get('window').width,height:Dimensions.get('window').height/2 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                zoom:15,
                longitudeDelta: 0.0421,
              }}
              />      
              <View>
                <Text style={{padding:10,marginTop:30}}>{t('dashboard:tabs.tabthree.methods.byTrain.title')}</Text>
                <Text style={styles.listItem}>{t('dashboard:tabs.tabthree.methods.byTrain.instructions.1')}</Text>
                <Text style={styles.listItem}>{t('dashboard:tabs.tabthree.methods.byTrain.instructions.2')}</Text>
              </View>
              <View>
                <Text style={{padding:10,marginTop:30}}>{t('dashboard:tabs.tabthree.methods.byCar.title')}</Text>
                <Text style={styles.listItem}>{t('dashboard:tabs.tabthree.methods.byCar.instructions.1')}</Text>
                <Text style={styles.listItem}>{t('dashboard:tabs.tabthree.methods.byCar.instructions.2')}</Text>
              </View>
              <View>
                <Text style={{padding:10,marginTop:30}}>{t('dashboard:tabs.tabthree.methods.byCycle.title')}</Text>
                <Text style={styles.listItem}>{t('dashboard:tabs.tabthree.methods.byCar.instructions.1')}</Text>
              </View>
          </ScrollView>
        </View>
        </Layout>
      )
  };
  NotesRoute = () => {
    const {t}= this.props;
    return (
        <Layout title={t('dashboard:tabs.tabfour.title')}>
          <ScrollView>
          <View>
            <Image resizeMode="contain" source={require('../../assets/images/caution.jpg')} style={styles.cautionImage}></Image>
            <Text style={styles.rules_title}>{t('rules:rules_of_arrival')}</Text>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.listItem}>{t('rules:items.1')}</Text>
              <Text style={styles.listItem}>{t('rules:items.2')}</Text>
              <Text style={styles.listItem}>{t('rules:items.3')}</Text>
              <Text style={styles.listItem}>{t('rules:items.4')}</Text>
              <Text style={styles.listItem}>{t('rules:items.5')}</Text>
              <Text style={styles.listItem}>{t('rules:items.6')}</Text>
              <Text style={styles.listItem}>{t('rules:items.7')}</Text>
            </ScrollView>
          </View>
          </ScrollView>
        </Layout>
      )
  };
  QrCode = () => {
    const {t}= this.props;
    return (
        <Layout title={t('dashboard:tabs.tabfive.title')}>
          <View style={{justifyContent:"center",flex:1,alignItems:"center",marginTop:10}}>
            {
              (this.state.user !==null)?
            <Image resizeMode="contain" source={{uri:"https://chart.googleapis.com/chart?cht=qr&chl="+this.state.user.uid+"&chs=250x250"}} style={{width:Dimensions.get("window").width/2,height:Dimensions.get("window").height/2,}}></Image>
            :
            <ActivityIndicator/>
            }
            <View>
              <Text style={{padding:10,color:Colors.white,textAlign:"center",fontSize:16,marginBottom:10,backgroundColor:Colors.pink700}}>{this.state.user.uid}</Text>
              <Text style={{textAlign:"center",fontSize:15}}>{new Date().toLocaleDateString()}</Text>
              <Text style={{textAlign:"center",fontSize:18}}>{t('dashboard:tabs.tabfive.showstaff')}</Text>
            </View>
          </View>
        </Layout>
      )
  };

  constructor(props){
    super(props);
        console.ignoredYellowBox = ['Setting a timer'];        
        const {t} = props;
    this.state = {
      index: 0,
      user:null,
      routes: [
        { key: 'information', title: t('dashboard:tabs.tabone.title') },
        { key: 'QrCode', title: t('dashboard:tabs.tabfive.title') },
        { key: 'second', title: t('dashboard:tabs.tabtwo.title') },
        { key: 'notes', title: t('dashboard:tabs.tabfour.title') },
        { key: 'map', title: t('dashboard:tabs.tabthree.title') },
      ],
    };
  }
 async componentDidMount(){
    const user = await firebase.auth().currentUser;
    this.setState({user:user})
    const profile = await database.collection("users").doc(user.uid).get().then(res=>res.data()).catch(error=>error);
    if(profile.quiz){
      if(!profile.quiz.isCompleted){
        this.props.navigation.navigate("Questions");
      }
    }
    else{
      this.props.navigation.navigate("Questions");
    }
  }
  render() {
    const {t,navigation} = this.props;
    return (
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            information: this.FirstRoute,
            second: this.SecondRoute,
            notes: this.NotesRoute,
            QrCode: this.QrCode,
            map: this.MapRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          style={{marginTop: 22,}}
          renderTabBar={props =>
            <TabBar
            {...props}
              activeColor={Colors.blue800}
              inactiveColor={Colors.grey400}
              indicatorStyle={{backgroundColor:Colors.white,}}
              style={[{ backgroundColor: Colors.white,elevation:0 }]}
              scrollEnabled={true}
            />
          }
          initialLayout={{ width: Dimensions.get("window").width }}
          />
    );
  }
}
export default withTranslation()(Dashboard);