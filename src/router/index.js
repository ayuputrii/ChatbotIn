import React from 'react';
import {Home, ChatRoom} from '../pages';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChatRoom"
        component={ChatRoom}
      />
    </Stack.Navigator>
  );
};

export default Router;
