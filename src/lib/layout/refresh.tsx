import {
  Text,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  Toast,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Link,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { dropfromRefresh } from '../components/utils/HelperFunctions';
import { scrape } from '~/lib/components/utils/scrape';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Refresh = () => {
  const toast = useToast();
  const { setData, setDefault_data, data, refresh_token, setRefreshToken } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [runfetch, setRunfetch] = useState(false);

  const scrapeData = async (refkey: string) => {
    setLoading(true);

    if (refkey) {
      scrape(refkey)
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
          console.log(data);
        })
        .catch((err) => {
          let errorMessage = 'An error occurred';
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
            } else if (err.request) {
              // The request was made but no response was received
              errorMessage = 'No response received';
            }
          } else {
            // Anything else
            errorMessage = ` ${err.message}`;
          }

          // alert(`Invalid refresh token` + ` ${errorMessage}`);

          toast({
            title: 'Error Getting Grades',
            description: errorMessage,
            status: 'error',
            duration: 9000,
            isClosable: true,
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
  }, [runfetch, refresh_token]);
  // useEffect(() => {
  //   if (code) {
  //     alert(code);

  //     const options = {
  //       method: 'POST',
  //       url: 'https://oauth2.googleapis.com/token',
  //       headers: {
  //         accept: '*/*',
  //         'content-type': 'application/x-www-form-urlencoded',

  //         'accept-language': 'en-US,en;q=0.9'
  //       },
  //       data: {
  //         grant_type: 'authorization_code',
  //         code: code,
  //         client_id: '162669419438-v9j0hrtnbkifi68ncq6jcr3ngadp2o0o.apps.googleusercontent.com',
  //         redirect_uri: 'com.powerschool.portal://'
  //       }
  //     };

  //     axios.request(options).then(function (response) {
  //       console.log(response.data);

  //       localStorage.setItem('refresh_token', response.data.refresh_token);

  //     }).catch(function (error) {
  //       console.error(error);
  //     });

  //   }
  // }, [code]);

  return (
    <Button
      isLoading={loading}
      onClick={() => {
        setRunfetch(!runfetch);
      }}
    >
      Refresh
    </Button>
  );
};

export default Refresh;
