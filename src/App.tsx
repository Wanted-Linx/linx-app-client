import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';

import colors from './style/colors';
import RootNavigator from './components/RootNavigator';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <StatusBar backgroundColor={colors.colorBackground} />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;
