import React from 'react';
import {Bubble} from 'react-native-gifted-chat';

const BubbleChat = ({...props}) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#009dae',
          elevation: 6,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 25,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        },
        left: {
          elevation: 6,
          marginBottom: 6,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        },
      }}
      textStyle={{
        right: {
          fontFamily: 'PatrickHand-Regular',
        },
        left: {
          fontFamily: 'PatrickHand-Regular',
        },
      }}
    />
  );
};

export default BubbleChat;
