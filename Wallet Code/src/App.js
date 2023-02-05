// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
// Utils
import { ContextProvider } from "./utils/contextModule";
// Screens
import Setup from "./screens/setups"
import Main from './screens/main';
import Recieve from './screens/recieve';
import Send from './screens/send';
import Dapp from './screens/dapp';
import QrWalletScan from './screens/qrwalletscan';
import QrWalletConnectScan from './screens/qrwalletconnectscan';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ["smblender://"],
  config: {
    screens: {
      Dapp: "cid/:cid",
    },
  },
};

class App extends React.Component {
  render() {
    return (
      <ContextProvider>
        <NavigationContainer linking={linking}>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="Setup" // Setup
            screenOptions={{
              headerShown: false,
              animation: 'none'
            }}
          >
            <Stack.Screen name="Setup" component={Setup} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Recieve" component={Recieve} />
            <Stack.Screen name="Send" component={Send} />
            <Stack.Screen name="Dapp" component={Dapp} />
            <Stack.Screen name="QrWalletScan" component={QrWalletScan} />
            <Stack.Screen name="QrWalletConnectScan" component={QrWalletConnectScan} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    );
  }
}

export default App;