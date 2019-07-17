import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Colors } from 'react-native-paper';

export default class HyperLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{width:"auto",padding:5,}}>
        <TouchableNativeFeedback onPress={this.props.onPress}>
            <Text style={{color:Colors.grey400,fontSize:22}}>{this.props.children}</Text>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
