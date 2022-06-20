import React from 'react';
import CallTopNavigator from './src/navigator/CallTopNavigator';
import MainStackNavigator from './src/navigator/MainStackNavigator';
import Test from './src/Test';

const App = () => {
  return <MainStackNavigator />;
  // return <CallTopNavigator />;
  // return <Test />;
};

export default App;
