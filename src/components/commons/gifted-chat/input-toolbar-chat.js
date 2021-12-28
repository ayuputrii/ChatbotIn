import React from 'react';
import {StyleSheet} from 'react-native';
import {InputToolbar} from 'react-native-gifted-chat';

const InputToolbarChat = ({...props}) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputContainer}
      textInputProps={{
        style: styles.inputToolbar,
      }}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  inputToolbar: {
    width: '84%',
    height: '80%',
    fontSize: 16,
    color: 'black',
    paddingTop: 6,
    paddingLeft: 14,
    marginLeft: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#009dae',
  },
});

export default InputToolbarChat;
