import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { visible } = this.props;
    return (
      <View>
        <Snackbar />
      </View>
    );
  }
}
