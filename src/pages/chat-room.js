import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat} from 'react-native-gifted-chat';
import {dialogFlowConfig} from '../../env';
import {InputToolbarChat, BubbleChat, SendMessage} from '../components/commons';
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
      text: 'Ada yang bisa aku bantu?',
      createdAt: new Date(),
      user: activeBot,
    },
    {
      _id: 1,
      text: `Hi, Aku ${activeBot.name}!`,
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

  const handleGoogleResponse = (result, i) => {
    const numberText = isNaN(i) ? 0 : i - 1;
    const textBase = result.queryResult.fulfillmentMessages;
    if (textBase[numberText]) {
      sendBotResponse(textBase[numberText].text.text[0]);
    } else {
      sendBotResponse(textBase[0].text.text[0]);
    }
  };

  const onSend = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));

    const message = newMessage[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => handleGoogleResponse(result, message),
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
    const textBase = result.queryResult.fulfillmentMessages;
    if (textBase[i]) {
      sendBotResponse(textBase[i].text.text[0]);
    } else {
      sendBotResponse(textBase[0].text.text[0]);
    }
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
        renderBubble={props => {
          return <BubbleChat {...props} />;
        }}
        renderSend={props => {
          return <SendMessage {...props} />;
        }}
        renderInputToolbar={props => {
          return <InputToolbarChat {...props} />;
        }}
        renderFooter={() => <View style={styles.footer} />}
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
  footer: {
    height: 75,
  },
  quickReply: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: '#fff',
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
