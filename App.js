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
import {dialogFlowConfig} from './env';
import quickReplies from './utils/quick-replies';

const avatarBot = require('./assets/images/2.jpg');

const activeBot = {
  _id: 2,
  name: 'Red Velvet',
  avatar: avatarBot,
};

const App = () => {
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
      <StatusBar barStyle="light-content" backgroundColor="gray" />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ChatbotIn</Text>
      </View>
      <View style={styles.sectionContainer}>
        <GiftedChat
          messages={messages}
          onSend={message => onSend(message)}
          user={{_id: 1}}
          renderChatFooter={() => (
            <View style={styles.quickReply}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.viewTouchableOpacity}>
                  {quickReplies.map((quickReply, i) => (
                    <TouchableOpacity
                      onPress={() => onQuickReplyPress(quickReply, i)}
                      style={styles.quickReplyOption}
                      key={i}>
                      <Text>{quickReply.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  sectionHeader: {
    height: 60,
    padding: 10,
    backgroundColor: 'gray',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  quickReply: {
    paddingHorizontal: 10,
    marginVertical: 15,
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
    borderColor: 'gray',
  },
});

export default App;
