import React, {useEffect, useRef, useState} from 'react';
import Splash from './src/component/Splash';
import MainStackNavigator from './src/navigator/MainStackNavigator';

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, []);

  if (isSplash) return <Splash />;

  return <MainStackNavigator />;
};

export default App;
