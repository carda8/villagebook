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

const qeuryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: e => {
      console.error('::: useQuery Error occurred', e);
    },
    onSuccess: s => {
      console.log('::: useQuery Success', s);
    },
  }),
  mutationCache: new MutationCache({
    onError: e => {
      console.error('::: useMutation Error occurred', e);
    },
    onSuccess: s => {
      console.log('::: useMutation Success', s);
    },
  }),
});

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

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
