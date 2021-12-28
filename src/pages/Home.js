import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AvatarBot from '../assets/images/2.jpg';

const Home = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar backgroundColor="#009dae" barStyle="light-content" />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ChatbotIn</Text>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.viewContent}>
          <Image source={AvatarBot} style={styles.images} />
          <View style={styles.gap}>
            <Text style={styles.titleContent}>
              Selamat datang di ruang percakapan
            </Text>
            <Text style={styles.titleContent}>seputar Lenna AI</Text>
          </View>
          <TouchableOpacity
            style={styles.touchableOpactity}
            onPress={() => navigation.navigate('ChatRoom')}>
            <Text style={styles.textTouchableOpacity}>Masuk Percakapan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  viewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  gap: {
    marginBottom: 12,
  },
  titleContent: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'PatrickHand-Regular',
  },
  images: {
    width: 200,
    height: 200,
  },
  touchableOpactity: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#009dae',
  },
  textTouchableOpacity: {
    fontFamily: 'PatrickHand-Regular',
  },
});

export default Home;
