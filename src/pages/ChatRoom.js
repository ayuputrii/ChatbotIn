import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {dialogFlowConfig} from '../../env';
import quickReplies from '../utils/quick-replies';

const avatarBot = require('../assets/images/2.jpg');

const activeBot = {
  _id: 2,
  name: 'Red Velvet',
  avatar: avatarBot,
};

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      _id: 2,
      name: 'A',
      text: 'Ada yang bisa saya bantu?',
      createdAt: new Date(),
      user: activeBot,
    },
    {
      _id: 1,
      text: `Hi, Saya ${activeBot.name}!`,
      createdAt: new Date(),
      user: activeBot,
    },
  ]);

  const sendBotResponse = text => {
    let message = {
      _id: Date.now(),
      text,
      createdAt: new Date(),
      user: activeBot,
    };
    setMessages(previousState => GiftedChat.append(previousState, [message]));
  };

  const handleGoogleResponse = result => {
    const text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };

  const onSend = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));

    const message = newMessage[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => handleGoogleResponse(result),
      error => console.log(error),
    );
  };

  const onQuickReplyPress = (message, i) => {
    const data = {
      createdAt: new Date(),
      text: message.text,
      user: {_id: 1},
      _id: Date.now(),
    };
    setMessages(GiftedChat.append(messages, [data]));
    Dialogflow_V2.requestQuery(
      message.value,
      result => handleQuickReplyResponse(result, i),
      error => console.log(error),
    );
  };

  const handleQuickReplyResponse = (result, i) => {
    const text = result.queryResult.fulfillmentMessages[i].text.text[0];
    sendBotResponse(text);
  };

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogFlowConfig.client_email,
      dialogFlowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogFlowConfig.project_id,
    );
  }, []);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#009dae" />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ChatbotIn</Text>
      </View>
      <GiftedChat
        alignTop
        alwaysShowSend={true}
        messages={messages}
        onSend={message => onSend(message)}
        user={{_id: 1}}
        renderSend={props => {
          return (
            <Send {...props}>
              <View style={styles.iconSend}>
                <Image source={avatarBot} style={styles.icon} />
              </View>
            </Send>
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={styles.inputContainer}
              textInputProps={{
                style: styles.inputToolbar,
              }}
            />
          );
        }}
        renderChatFooter={() => (
          <View style={styles.quickReply}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.viewTouchableOpacity}>
                {quickReplies.map((quickReply, i) => (
                  <TouchableOpacity
                    onPress={() => onQuickReplyPress(quickReply, i)}
                    style={styles.quickReplyOption}
                    key={i}>
                    <Text style={styles.textTouchableOpacity}>
                      {quickReply.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  sectionHeader: {
    height: 60,
    padding: 10,
    backgroundColor: '#009dae',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'PatrickHand-Regular',
  },
  inputContainer: {
    marginBottom: 6,
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
  iconSend: {
    marginHorizontal: 2,
    top: 5,
    elevation: 5,
  },
  icon: {
    height: 40,
    width: 40,
  },
  quickReply: {
    paddingHorizontal: 10,
    marginVertical: 20,
    position: 'absolute',
    bottom: 0,
  },
  viewTouchableOpacity: {
    flexDirection: 'row',
  },
  quickReplyOption: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#009dae',
  },
  textTouchableOpacity: {
    fontFamily: 'PatrickHand-Regular',
  },
});

export default ChatRoom;
