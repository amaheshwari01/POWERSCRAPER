import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';
import AppContext from '~/lib/utils/AppContext';

const App = () => {
  const [data, setData] = useState<any>({});
  const [default_data, setDefault_data] = useState<any>({});
  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider
        value={{ default_data, setDefault_data, data, setData }}
      >
        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
