import React, { Component } from 'react';
import { View, Text,ScrollView,StatusBar } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { List, Title, Paragraph, Colors, Card, DataTable } from 'react-native-paper';
import {styles} from '../Stylesheet'
import { LinearGradient } from 'expo-linear-gradient';

const FeesList = [
    {
        title:"fees:fees_list.zero.title",
        fees:"fees:fees_list.zero.fee",
    },
    {
        title:"fees:fees_list.one.title",
        fees:"fees:fees_list.one.fee",
    },
    {
        title:"fees:fees_list.two.title",
        fees:"fees:fees_list.two.fee",
    },
    {
        title:"fees:fees_list.three.title",
        fees:"fees:fees_list.three.fee",
    },
    {
        title:"fees:fees_list.four.title",
        fees:"fees:fees_list.four.fee",
    },
]
const discountList = ["one","two","three","four","five","six","seven","eight","nine","ten"];

export class Fees extends Component {

  render() {
    const {t,navigation} = this.props;

    return (
      <View>
        <Layout title={t("common:fees")} navigation={this.props.navigation}>
            <StatusBar hidden={false}/>
            <ScrollView style={[{padding:20}]}>
                <View>

                    <Card>
                        <Card.Content>
                            <Title style={[styles.font,{color:Colors.blue900}]}>{t('fees:uniform')}</Title>
                            <Paragraph style={[styles.font]}>1800 {t('common:yen')}</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
                    <Card style={[{backgroundColor:Colors.white}]}>
                        <Card.Content>
                            <Title style={[styles.font,{color:Colors.blue900}]}>{t('fees:age_discount')}</Title>
                            <DataTable>
                                {
                                    FeesList.map(r=>{
                                        return (
                                            <DataTable.Row key={r.fees}>
                                                <DataTable.Cell>{t(r.title)}</DataTable.Cell>
                                                <DataTable.Cell numeric>{t(r.fees)} {t("common:yen")}</DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })
                                }
                            </DataTable>
                            <Paragraph style={[styles.font,styles.whiteText]}>1800 {t('common:yen')}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={[{backgroundColor:Colors.white}]}>
                        <Card.Content>
                            <Title style={[styles.font,{color:Colors.blue900}]}>{t('fees:special_discount')}</Title>
                            {
                                discountList.map(r=>{
                                    return (
                                        <View style={{padding:10}} key={r}>
                                            <Text style={[styles.font,{color:Colors.blue400,fontSize:16}]}>{t(`fees:discounts.${r}.title`)}</Text>
                                            <Paragraph style={[styles.font]}>{t(`fees:discounts.${r}.value`)}</Paragraph>
                                        </View>
                                    )
                                })
                            }
                        </Card.Content>
                    </Card>
            </ScrollView>
        </Layout>
      </View>
    );
  }
}
export default withTranslation()(Fees);