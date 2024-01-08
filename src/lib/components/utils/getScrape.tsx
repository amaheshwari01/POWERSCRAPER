import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import AppContext from "~/lib/utils/AppContext";
import { dropfromRefresh } from "./HelperFunctions";
import { scrape } from "./scrape";

export default function Scraper() {

    const { refresh_token, setLoading, setDefault_data, setData, setRefreshToken, runFetch, setWeights } = useContext(AppContext);
    const toast = useToast();
    const scrapeData = async (refkey: string) => {
        setLoading(true);

        if (refkey) {
            toast.closeAll()

            scrape(refkey, setWeights)
                .then(async (data) => {
                    await setDefault_data(data);
                    const gradesToDrop = [];
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);

                        if (key.startsWith('drop:')) {
                            gradesToDrop.push({
                                key,
                                value: localStorage.getItem(key),
                            });
                        }
                    }
                    let newData = data;
                    // console.log(gradesToDrop)
                    gradesToDrop.forEach((value) => {
                        // console.log(value)
                        const section_guid = value.key.split(':')[1].split('|')[0];
                        // console.log(section_guid)
                        const category = value.key.split('|')[1];
                        const term = value.key.split('|')[2];
                        // console.log(term)
                        const numtodrop = parseInt(value.value);
                        if (numtodrop > 0) {
                            newData = dropfromRefresh(
                                section_guid,
                                category,
                                newData,
                                numtodrop,
                                term
                            );
                        }
                    });

                    await setData(newData);

                    setLoading(false);
                    toast.closeAll()

                    console.log(data);
                })
                .catch((err) => {
                    let errorMessage = err.message;
                    if (axios.isAxiosError(err)) {
                        if (err.response) {
                            // The request was made and the server responded with a status code that falls out of the range of 2xx
                            const statusCode = err.response.status;
                            if (statusCode === 404) {
                                errorMessage =
                                    'The requested resource does not exist or has been deleted';
                            } else if (statusCode === 401) {
                                errorMessage = 'Please login to access this resource';
                            }
                            else if (statusCode === 400) {
                                errorMessage = 'Invalid token';
                                localStorage.removeItem('refresh_token');
                                for (let i = 0; i < localStorage.length; i++) {
                                    let key = localStorage.key(i);
                                    if (key.startsWith('drop:')) {
                                        localStorage.removeItem(key);
                                    }
                                }
                                setRefreshToken('');

                                // setRefreshToken('')
                                // window.location.reload()
                            }
                        } else if (err.request) {
                            // The request was made but no response was received
                            errorMessage = 'No response received please check your WIFI Connection';
                        }
                    }

                    // alert(`Invalid refresh token` + ` ${errorMessage}`);


                    // onOpen();
                    toast.closeAll()

                    toast({
                        title: 'Error Getting Grades',
                        description: errorMessage,
                        status: 'error',
                        duration: null,
                        isClosable: false,
                    });
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        // console.log(refkey);
        if (refresh_token !== '') {
            scrapeData(refresh_token);
        }
    }, [runFetch, refresh_token]);
    return <>    </>
}