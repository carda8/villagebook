import React, {useEffect, useRef, useState} from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {Provider} from 'react-redux';
import Splash from './src/component/Splash';
import MainStackNavigator from './src/navigator/MainStackNavigator';
import store from './src/store/store';
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

const qeuryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: e => {
      console.error('::: useQuery Error occurred', e);
    },
    onSuccess: s => {
      // console.log('::: useQuery Success', s);
    },
  }),
  mutationCache: new MutationCache({
    onError: e => {
      console.error('::: useMutation Error occurred', e);
    },
    onSuccess: s => {
      // console.log('::: useMutation Success', s);
    },
  }),
});

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  const onMessageReceived = async message => {
    console.log('message', message);
    const channelId2 = await notifee.createChannel({
      id: 'onForeground',
      name: 'Default Channel onForeground',
      importance: AndroidImportance.HIGH,
    });
    // Display a notification
    await notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId: channelId2,
        importance: AndroidImportance.HIGH,
      },
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onMessageReceived(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, []);

  if (isSplash) return <Splash />;

  return (
    <Provider store={store}>
      <QueryClientProvider client={qeuryClient}>
        <MainStackNavigator />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
