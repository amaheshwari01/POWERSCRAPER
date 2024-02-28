import { Box, Button, Grid, Skeleton, Spinner, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import Loading from '~/lib/components/render/Loader';
import FullRender from '~/lib/components/render/full';
import { Login } from '~/lib/components/render/login';
import { usePullToRefresh } from 'use-pull-to-refresh';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')
import Scraper from '~/lib/components/utils/getScrape';
import { capacitor } from 'knip/dist/plugins';
import { Capacitor } from '@capacitor/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 10;
// import ReactPullToRefresh from 'react-pull-to-refresh';
const Home = () => {
    const [refresthing, setRefreshing] = useState(false);
    const [topPadding, setTopPadding] = useState(0);
    const { data, refresh_token, loading, runFetch, setRunFetch } = useContext(AppContext);



    const { isRefreshing, pullPosition } = usePullToRefresh({

        onRefresh: () => {

            setRunFetch(!runFetch);

        },
        maximumPullLength: MAXIMUM_PULL_LENGTH,
        refreshThreshold: REFRESH_THRESHOLD,
        isDisabled: false
    });
    useEffect(() => {
        if (isRefreshing) {
            setRefreshing(true)
        }
    }, [isRefreshing])
    useEffect(() => {
        //check if mobile by checking window size
        if (window.innerWidth < 800) {
            //check if capacitor
            setRefreshing(loading)
        }

    }
        , [loading])
    useEffect(() => {
        SafeArea.getSafeAreaInsets().then(({ insets }) => {
            // alert(JSON.stringify(insets));
            setTopPadding(insets.top)
        });
        // when safe-area changed
        SafeArea.addListener('safeAreaChanged', data => {
            const { insets } = data;
            setTopPadding(insets.top);
            // alert(JSON.stringify(insets));
        });
    }, []);

    return <>
        <Scraper />




        {refresh_token !== '' && (
            <>
                <div
                    style={{
                        backgroundColor: '#f7fafc', // bg-base-100
                        position: 'fixed',
                        left: '50%', // inset-x-1/2
                        // top: '1000px', // inset-y-0
                        zIndex: 30, // z-30
                        height: '3rem', // h-8
                        width: '3rem', // w-8
                        transform: 'translateX(-50%)', // -translate-x-1/2
                        borderRadius: '9999px', // rounded-full
                        padding: '0.5rem', // p-2
                        // paddingLeft: '0.5rem',
                        // paddingRight: '0.5rem',
                        // paddingBottom: '0.5rem',
                        //top padding
                        // paddingTop: topPadding + "px",
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow
                        top: (refresthing ? REFRESH_THRESHOLD + topPadding : pullPosition) / 3,
                        opacity: refresthing || pullPosition > 0 ? 1 : 0,
                    }}
                >
                    <Spinner

                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                    />
                </div>

                {Object.keys(data).length === 0 && <Loading />}
                {Object.keys(data).length !== 0 && <FullRender />}
            </>
        )}
        {refresh_token === '' && <Login />}
        {/* </ReactPullToRefresh > */}
    </>

};

export default Home;
