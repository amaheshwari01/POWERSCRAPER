import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from '~/lib/utils/AppContext';
import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';
import { useState } from 'react';

const App = () => {
  const [data, setData] = useState<any>({});
  const [default_data, setDefault_data] = useState<any>({});
  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider value={{ default_data, setDefault_data, data, setData }}>

        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
