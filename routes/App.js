import {createStackNavigator} from 'react-navigation'
import Dashboard from '../src/views/Dashboard'
import Fees from '../src/views/Fees'
import Settings from '../src/views/Settings';
import Support from '../src/views/Support';
import Profile from '../src/views/Profile';
import Inquiry from '../src/views/Inquiry';
import Stamps from '../src/views/Stamps';
import TC from '../src/views/Twm.js'
import Congession from '../src/views/Congession'
import InStore from '../src/views/InStore'
import EntryNotice from '../src/views/EntryNotice'
import EntranceRegister from '../src/views/EntranceRegister'
import EntranceList from '../src/views/EntranceList'
import People from '../src/views/People'

import Questions from '../src/views/Questions'
import AreYouFirstTime from '../src/views/questionaire/AreYouFirstTime'
import DoYouHaveQuestions from '../src/views/questionaire/DoYouHaveQuestions'
import DoYouExplainStaff from '../src/views/questionaire/DoYouExplainStaff'
import StaffWillSpeak from '../src/views/questionaire/StaffWillSpeak'
import CheckedManual from '../src/views/questionaire/CheckedManual'
import Manual from '../src/views/questionaire/Manual'
import WhatPointUnknown from '../src/views/questionaire/WhatPointUnknown'
import LookingForward from '../src/views/questionaire/LookingForward'

import { fromRight } from 'react-navigation-transitions';

const routes = createStackNavigator(
    {
      Dashboard: { screen: Dashboard },
      Settings: { screen: Settings },
      FeesItems: { screen: Fees },
      AreYouFirstTime: { screen: AreYouFirstTime },      
      DoYouHaveQuestions: { screen: DoYouHaveQuestions },      
      DoYouExplainStaff: { screen: DoYouExplainStaff },      
      StaffWillSpeak: { screen: StaffWillSpeak },
      Manual: { screen:Manual },
      CheckedManual: { screen: CheckedManual },
      WhatPointUnknown: { screen: WhatPointUnknown },      
      LookingForward: { screen: LookingForward },      
      Questions: { screen: Questions },      
      Support: { screen: Support },
      Profile: { screen: Profile },
      Stamps: { screen: Stamps },
      Inquiry: { screen: Inquiry },
      TermsAndConditions: { screen: TC },
      Congession: { screen: Congession },
      EntryNotice: { screen: EntryNotice },
      InStore: { screen: InStore },
      EntranceRegister: { screen: EntranceRegister },
      EntranceList: { screen: EntranceList },
      People: { screen: People },
    },
    {
      initialRouteName:"Dashboard",
      transitionConfig: () => fromRight(),
      defaultNavigationOptions:{
        header:null,
      }      
    }
);
export default routes;