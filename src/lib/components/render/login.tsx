import { Button, Center, useToast } from '@chakra-ui/react';
import axios from 'axios';
import type { PageEvent } from 'capacitor-webview-controller';
import { WebviewController } from 'capacitor-webview-controller';
import { useContext, useEffect } from 'react';

import AppContext from '~/lib/utils/AppContext';
// const fs = window.require('fs')
export const Login = () => {
  const { refresh_token, setRefreshToken } = useContext(AppContext);
  const toast = useToast();
  const handleCallback = (args: PageEvent) => {
    console.log(args.url);
    const code = args.url.split('code=')[1].split('&')[0];
    WebviewController.closeWindow();
    if (code) {
      const options = {
        method: 'POST',
        url: 'https://oauth2.googleapis.com/token',
        headers: {
          accept: '*/*',
          'content-type': 'application/x-www-form-urlencoded',

          'accept-language': 'en-US,en;q=0.9',
        },
        data: {
          grant_type: 'authorization_code',
          code,
          client_id:
            '162669419438-v9j0hrtnbkifi68ncq6jcr3ngadp2o0o.apps.googleusercontent.com',
          redirect_uri: 'com.powerschool.portal://',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);

          localStorage.setItem('refresh_token', response.data.refresh_token);

          setRefreshToken(response.data.refresh_token);
        })
        .catch(function (error) {
          toast({
            title: 'Error Logging in',
            description: error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };
  const openBrowser = () => {
    WebviewController.addListener('navigation', handleCallback);

    WebviewController.loadURL({
      url: 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&redirect_uri=com.powerschool.portal%3A%2F%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&response_type=code&client_id=162669419438-v9j0hrtnbkifi68ncq6jcr3ngadp2o0o.apps.googleusercontent.com',
    });
    console.log('loaded');
  };
  useEffect(() => {
    localStorage.getItem('refresh_token')
      ? setRefreshToken(localStorage.getItem('refresh_token'))
      : null;
  }, []);
  return (
    <Center pt="20%">
      <Button onClick={openBrowser} colorScheme="purple">
        Login
      </Button>
    </Center>
  );
};