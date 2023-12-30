import { Button, Grid, Skeleton } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import Loading from '~/lib/components/render/Loader';
import FullRender from '~/lib/components/render/full';
import { Login } from '~/lib/components/render/login';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Home = () => {
  const { data, refresh_token } = useContext(AppContext);

  return <>

    {Object.keys(data).length === 0 && <Loading />}
    {Object.keys(data).length !== 0 && <FullRender />}

  </>;
};

export default Home;
