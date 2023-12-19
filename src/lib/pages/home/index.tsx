import { Button, Grid, Skeleton } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import FullRender from '~/lib/components/render/full';
import { Login } from '~/lib/components/render/login';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Home = () => {
  const { data, refresh_token } = useContext(AppContext);

  return (
    <>
      {refresh_token !== '' && (
        <>
          {Object.keys(data).length === 0 && <Skeleton height="90vh" />}
          {Object.keys(data).length !== 0 && <FullRender />}
        </>
      )}
      {refresh_token === '' && <Login />}
    </>
  );
};

export default Home;
