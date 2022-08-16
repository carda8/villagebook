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
import {Alert, Linking, PermissionsAndroid} from 'react-native';
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

  const _deepLink = () => {
    Linking.getInitialURL().then(res => {
      //앱이 실행되지 않은 상태에서 요청이 왔을 때
      if (res == null || res == undefined || res == '') {
        return;
      } else {
        var params = JSON.stringify(res);
        console.log('from backgroud',params);
      }
    });
    Linking.addEventListener('url', e => {
      // 앱이 실행되어있는 상태에서 요청이 왔을 때 처리하는 이벤트 등록
      var params = JSON.stringify(e.url);
      if (e.url == null || e.url == undefined || e.url == '') {
        return;
      } else {
        console.log('fourground',params);
      }
    });
  };

  useEffect(() => {
    _deepLink();
  }, []);

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
