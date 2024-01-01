import { Box, Button, Grid, Skeleton } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import Loading from '~/lib/components/render/Loader';
import FullRender from '~/lib/components/render/full';
import { Login } from '~/lib/components/render/login';
import { usePullToRefresh } from 'use-pull-to-refresh';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')
const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;
// import ReactPullToRefresh from 'react-pull-to-refresh';
const Home = () => {
  const { data, refresh_token } = useContext(AppContext);
  const { isRefreshing, pullPosition } = usePullToRefresh({
    onRefresh: () => {
      // Your refresh function here
      alert('Page was pulled down!');
    },
    maximumPullLength: 200,
    refreshThreshold: 100,
    isDisabled: false
  });



  return <div
    style={{
      top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
      // opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
    }}
  >
    {/* <ReactPullToRefresh onRefresh={handleRefresh} > */}
    {/* <Box w="100%" h="100%" bg="green.200" /> */}
    {/*  */}



    {refresh_token !== '' && (
      <>
        {Object.keys(data).length === 0 && <Loading />}
        {Object.keys(data).length !== 0 && <FullRender />}
      </>
    )}
    {refresh_token === '' && <Login />}
    {/* </ReactPullToRefresh > */}

  </div>
};

export default Home;
