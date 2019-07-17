import React, { Component } from 'react';
import { View, Text,ActivityIndicator,StatusBar,Animated } from 'react-native';
import { withTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors,IconButton, Provider } from 'react-native-paper';
import Fonts from '../models/Fonts'
import * as Font from 'expo-font';

import {RootStyles} from '../Stylesheet'
export class Layout extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer'];        
        this.state = {
            isready:false,
            titleInAnimation:new Animated.Value(30),
        }
    }
    async componentDidMount() {
        await Font.loadAsync(Fonts);
        this.setState({isready:true})
        // Animated.spring(this.state.loginBtnBottom,{toValue: 60,duration: 150,}).start();
      }
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const {t} = this.props;
    if(this.state.isready)
    return (
        <View style={{height:"100%"}}>
            <StatusBar backgroundColor='white' barStyle='light-content' />
            {this.props.title?
            <View style={{paddingTop:45,padding:10,backgroundColor:Colors.white}}>
            {(this.props.navigation && this.props.navigation.dangerouslyGetParent().state.index>0)?
            <IconButton icon="arrow-back" color={Colors.blue900} size={25} style={{marginTop:2}} onPress={() => this.props.navigation.goBack()}/>
            :null}
            <Text style={[RootStyles.headerTitle]}>{this.props.title}</Text></View>:null}
            <View style={{padding:10,flex:1}}>
            {this.props.children}
            </View>
        </View>
    );
    else
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center",minHeight:"100%" }}>
                <ActivityIndicator size="large" color={Colors.purple500}/>
            </View>
        );
  }
}
export default withTranslation()(Layout);


{/* <View style={{marginTop:40}}>
<StatusBar backgroundColor='blue' barStyle='light-content' />
<View>
<View style={{display:"flex",flexDirection: 'row',height:40}}>
    {(this.props.navigation && this.props.navigation.dangerouslyGetParent().state.index>0)?
    <IconButton icon="arrow-back" color={Colors.blue900} size={25} style={{marginTop:2}} onPress={() => this.props.navigation.goBack()}/>
        :
        null
    }
    <Text style={[RootStyles.headerTitle]}>{this.props.title}</Text>
</View>                
    {this.props.children}
</View>
</View> */}