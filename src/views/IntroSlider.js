import React from 'react';
import { StyleSheet,View,Text,StatusBar,Image,AsyncStorage,ScrollView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Provider, Colors,Modal, Portal,Button } from 'react-native-paper';
import {LinearGradient} from 'expo'
import { withTranslation } from 'react-i18next';
import Root from './Layout'

import slides from '../models/slides'
 
class App extends React.Component {
  state = {
    showRealApp: false,
    rulesmodal: false,
  }
  _showModal = () => this.setState({ rulesmodal: true });
  _hideModal = () => this.setState({ rulesmodal: false });
  _renderItem = (l) => {
      const { t, i18n, navigation } = this.props;
      const item = l.item;
    return (
      <Root>
        <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={[item.backgroundColor,"#FFFFFF"]} style={[styles.slide,{backgroundColor:item.backgroundColor}]}>
            <Image source={item.image} style={styles.image}/>
            <Text style={styles.title}>{t(item.title)}</Text>
            <Text style={styles.text}>{t(item.text)}</Text>
        </LinearGradient>
      </Root>

    );

  }
  renderDoneButton = (item) => {
    const { t, i18n, navigation } = this.props;
    return (
        <Button mode="text" color={Colors.blueGrey700}>{t('common:done')}</Button>
    );
    }
    renderPrevButton = (item) => {
    const { t, i18n, navigation } = this.props;
    return (
        <Button mode="text" color={Colors.blueGrey700}>{t('common:prev')}</Button>
    );
    }
  renderNextButton = (item) => {
    const { t, i18n, navigation } = this.props;
    return (
        <Button mode="text" color={Colors.blueGrey700}>{t('common:next')}</Button>
    );
    }
  renderSkipButton = (item) => {
    const { t, i18n, navigation } = this.props;
    return (
        <Button mode="text" color={Colors.blueGrey700}>{t('common:skip')}</Button>
    );
    }
  _onDone = async () => {
        try {
            await AsyncStorage.setItem('@APP:IntroDone',"true");
            this.props.navigation.navigate('AuthLoading')
        } catch (error) {
            console.log(` Unable to Save Intro Session: ${error}`);
            return false;
        }
    }
  render() {
    const { rulesmodal } = this.state;
    const { t, i18n, navigation } = this.props;
    return (
        <Provider>
        <StatusBar hidden={true}/>     
        <Portal>
            <Modal visible={rulesmodal} onDismiss={this._hideModal} >
                <View style={styles.modal}>
                    <View style={styles.modalcontent}>
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
                        <Button onPress={this._onDone} mode="contained" color={Colors.blue800} compact={true}>{t('common:ok')}</Button>
                    </View>
                </View>
            </Modal>
        </Portal>     
            <AppIntroSlider 
               renderDoneButton={this.renderDoneButton}
               renderNextButton={this.renderNextButton}
               renderSkipButton={this.renderSkipButton}
               showSkipButton={sliderOptions.showSkipButton}
               showPrevButton={sliderOptions.showPrevButton}
               renderPrevButton={this.renderPrevButton}
               renderItem={this._renderItem} 
               slides={slides} 
               dotStyle={{backgroundColor:Colors.blueGrey500,width:5,height:5}}
               activeDotStyle={{backgroundColor:Colors.blueGrey100,}}
               onDone={this._showModal}/>
      </Provider>
      );
  }
}
const styles = StyleSheet.create({
    slide:{
        justifyContent: 'center',
        minHeight: "100%",
        alignContent: 'center',
        flex:1,
        alignItems: 'center',
        padding:30,
        width:"100%"
    },
    title:{
        color:Colors.grey800,
        fontSize: 35,
        letterSpacing:3,
        marginBottom: 20,    
        textAlign:"center",
        fontFamily: 'poppins-light',
    },
    text:{
        color:Colors.grey700,
        fontSize: 15,
        lineHeight:30,
        textAlign:"center",
        fontFamily: 'poppins',
    },
    image:{
        backgroundColor:Colors.white,
        marginBottom:30,
        padding:20,
        width: 250, 
        height: 250
    },
    modal:{
        width:"100%",
        height:"100%",
        paddingRight:20,
        paddingLeft:20,
        alignContent:"center",
        justifyContent:"center"
    },
    modalcontent:{
        backgroundColor:Colors.white,
        width:"100%",
        height:"80%",
        borderRadius:10,
        padding:10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalBody:{
        width:"100%",
        paddingTop:5,
        padding:30,
    },
    rules_title:{
        fontSize:32,
        textAlign:"center",
        color:Colors.blueGrey400,
        marginBottom:20,
        fontFamily: 'poppins-bold',
    },
    listItem:{
        fontSize:15,
        marginBottom:10,
        color:Colors.grey600,
        fontFamily: 'poppins',
    },
    cautionImage:{
        width:140,
        padding:30,
        height:70,
        marginBottom:20,
        alignSelf: 'center',
        flex:1,
    }
})

const sliderOptions = {
    showSkipButton:true,
    showPrevButton:true,
}
export default withTranslation(['intro', 'common'], { wait: true })(App);
