
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import EditSubscriptionScreen from './src/screens/EditSubscriptionScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <BottomSheetModalProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <EditSubscriptionScreen />
      </BottomSheetModalProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>

  );
}

export default App;
