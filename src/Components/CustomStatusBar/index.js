import React from 'react';
import {View, StatusBar, Platform} from 'react-native';

export default function CustomStatusBar(props) {
  const height = Platform.OS === 'ios' ? 40 : 0;
  const {backgroundColor} = props;

  return (
    <View style={{height, backgroundColor}}>
      <StatusBar {...props} />
    </View>
  );
}
