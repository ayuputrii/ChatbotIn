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
    marginHorizontal: 2,
    top: 5,
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default SendMessage;
