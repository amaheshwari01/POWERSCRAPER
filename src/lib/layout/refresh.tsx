import { Button } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { scrape } from '~/lib/components/scrape';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Refresh = () => {
    const { setData, setDefault_data } = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const scrapeData = async () => {
        setLoading(true)
        scrape().then(async (data) => {
            await setDefault_data(data);
            await setData(data);
            setLoading(false)

        });
    }
    useEffect(() => {
        scrapeData()
    }
        , [])


    return (
        <>
            <Button isLoading={loading} onClick={scrapeData}>Refresh</Button>

        </>
    );
};

export default Refresh;
