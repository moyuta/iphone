import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {styles} from '../../Stylesheet';
import {View, Text,ScrollView } from 'react-native';
import { Image } from 'react-native-paper';

export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{},
        isLoading:false,
    };
  }
  render() {
    const {t,navigation} = this.props;
    return (
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
    );
  }
}
export default withTranslation()(Notes);
