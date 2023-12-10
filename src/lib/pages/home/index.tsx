import { Button, Grid, Skeleton } from '@chakra-ui/react';
import { useContext } from 'react';

import FullRender from '~/lib/components/render/full';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Home = () => {
  const { data } = useContext(AppContext);

  return <>

    {Object.keys(data).length === 0 && <Skeleton height={"90vh"}></Skeleton>}
    {Object.keys(data).length !== 0 && <FullRender />}

  </>;
};

export default Home;
