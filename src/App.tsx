import Routes from '@/routes';
import { BrowserRouter } from 'react-router-dom';
import { AppSettingProvider } from '@/store/appSetting/context';
import { Toaster } from './ui/toast/toast';
import { ChakraProvider } from '@chakra-ui/react';

const App = (): JSX.Element => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppSettingProvider>
          <Routes />
          <Toaster />
        </AppSettingProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
