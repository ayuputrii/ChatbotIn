import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Send} from 'react-native-gifted-chat';

const sendIcon = require('../../../assets/images/send.png');

const SendMessage = ({...props}) => {
  return (
    <Send {...props}>
      <View style={styles.iconSend}>
        <Image source={sendIcon} style={styles.icon} />
      </View>
    </Send>
  );
};

const styles = StyleSheet.create({
  iconSend: {
    top: 12,
  },
  icon: {
    height: 48,
    width: 48,
  },
});

export default SendMessage;
