import {createStackNavigator} from 'react-navigation'
import Fees from '../src/views/Fees'
import Index from '../src/views/Index';
import Register from '../src/views/Register';
import Support from '../src/views/Support';
import { fromRight } from 'react-navigation-transitions';
import Login from '../src/views/Login';

const routes = createStackNavigator(
    {
      Index: { screen: Index },
      Fees: { screen: Fees },
      Login: { screen: Login },
      Register: { screen: Register },
      Support: { screen: Support },
    },
    {
      initialRouteName:"Index",
      transitionConfig: () => fromRight(),
      defaultNavigationOptions:{
        header:null,
      }      
    }
);
export default routes;