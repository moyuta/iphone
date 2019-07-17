import React, { Suspense } from 'react';

import { withTranslation } from 'react-i18next';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import i18n from './src/models/Locale';

import { View,Text,ActivityIndicator   } from 'react-native';
import {Colors} from 'react-native-paper'
import { fromRight } from 'react-navigation-transitions';

import Loading from './src/views/Loading'
import Intro from './src/views/IntroSlider'
import Auth from './routes/Auth'
import App from './routes/App'

const AppContainer = createSwitchNavigator(
  {
    AuthLoading: Loading,
    App: App,
    Intro: Intro,
    Auth: Auth,
  },
  {
    initialRouteName: 'AuthLoading',
    transitionConfig: () => fromRight(),
    defaultNavigationOptions:{
      header:null,
      headerStyle:{
        backgroundColor:Colors.purple100,
      }
    }
  }
);

class WrappedStack extends React.Component {
  static router = AppContainer.router;
  render() {
    const { t } = this.props;
    return <AppContainer screenProps={{ t }} {...this.props} />;
  }
}
const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(createAppContainer(WrappedStack));

class SuspenseLoader extends React.Component {
  render(){
    return (
          <View style={{flex: 1,justifyContent: 'center',backgroundColor:Colors.grey300}}>
            <ActivityIndicator size="large" color={Colors.purple800} />
          </View>
    )
  }
}
export default class Application extends React.Component {
  render() {
    return (
        <Suspense fallback={<SuspenseLoader/>}>
          <ReloadAppOnLanguageChange />
        </Suspense>      
    );
  }
}