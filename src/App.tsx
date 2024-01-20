import { ChakraProvider } from '@chakra-ui/react';
import { inject } from '@vercel/analytics';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PullToRefresh from 'react-pull-to-refresh';
import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';
import AppContext from '~/lib/utils/AppContext';

const App = () => {
  const [data, setData] = useState<any>({});
  const [default_data, setDefault_data] = useState<any>({});
  const [refresh_token, setRefreshToken] = useState<string>('');
  const [runFetch, setRunFetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [weights, setWeights] = useState<any>({});

  useEffect(() => {
    // inject();
    // console.log(window.location.pathname)

  }, []);

  return (
    <ChakraProvider theme={theme}>

      <AppContext.Provider
        value={{
          default_data,
          setDefault_data,
          data,
          setData,
          refresh_token,
          setRefreshToken,
          runFetch,
          setRunFetch,
          loading,
          setLoading,
          weights,
          setWeights,
        }}
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
