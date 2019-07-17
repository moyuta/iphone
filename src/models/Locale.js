import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {AsyncStorage} from 'react-native'
import * as Localization from 'expo-localization';

// Languages 
import en from './languages/en-US.json'
import ja from './languages/ja.json'
import ch from './languages/ch.json'
const STORAGE_KEY = '@APP:languageCode';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
      const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
      const lng = (savedDataJSON) ? savedDataJSON: null;
      const selectLanguage = lng || "ja";
      callback(selectLanguage);
  },
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: en,
      ja: ja,
      ch: ch,
    },
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
