import { Button, Center, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, Text, Box, AbsoluteCenter } from '@chakra-ui/react';
import axios from 'axios';
import type { PageEvent } from 'capacitor-webview-controller';
import { WebviewController } from 'capacitor-webview-controller';
import { useContext, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import AppContext from '~/lib/utils/AppContext';
// const fs = window.require('fs')
export const Login = () => {
  const { refresh_token, setRefreshToken } = useContext(AppContext);
  const [curRefKey, setcurRefKey] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const handleCallback = async (args: PageEvent) => {
    console.log(args.url);
    const code = args.url.split('code=')[1].split('&')[0];
    if (code) {

      hanldeCode(code);
      await WebviewController.closeWindow();

    }



  };
  const hanldeCode = async (code: string) => {
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
    try {
      const response = await axios.request(options)

      console.log(response.data);

      localStorage.setItem('refresh_token', response.data.refresh_token);

      setRefreshToken(response.data.refresh_token);
      setLoading(false);

      // WebviewController.hide();
      // WebviewController.closeWindow();
    }
    catch (err) {
      setLoading(false);

      toast({
        title: 'Error Logging in',
        description: err,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

  }
  const openBrowser = () => {
    setLoading(true);

    WebviewController.loadURL({
      url: 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&redirect_uri=com.powerschool.portal%3A%2F%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&response_type=code&client_id=162669419438-v9j0hrtnbkifi68ncq6jcr3ngadp2o0o.apps.googleusercontent.com',
    });
    WebviewController.addListener('navigation', handleCallback);

    console.log('loaded');

  };
  const login = () => {
    const platform = Capacitor.getPlatform();
    if (platform === 'web') {

      onOpen();

      return;
    }
    else {
      openBrowser();
    }
  }

  const saveKey = () => {
    localStorage.setItem('refresh_token', curRefKey);
    setRefreshToken(curRefKey);
    onClose();
  }
  useEffect(() => {
    localStorage.getItem('refresh_token')
      ? setRefreshToken(localStorage.getItem('refresh_token'))
      : null;
    if (localStorage.getItem('refreshkey')) {
      const key = localStorage.getItem('refreshkey');
      localStorage.setItem('refresh_token', key);
      localStorage.removeItem('refreshkey');
      setRefreshToken(key)
    }
    else {
      const urlkey = new URLSearchParams(window.location.search).get('token')
      if (urlkey) {
        localStorage.setItem('refresh_token', urlkey);
        setRefreshToken(urlkey);
        //refresh page
        window.location.href = window.location.href.split('?')[0];
      }

    }

  }, []);
  return (
    <>
      <Box position={"fixed"} top={"50%"} left={"50%"} zIndex={9999} transform={"translate(-50%,-50%)"}>
        {/* <AbsoluteCenter> */}
        <Button onClick={login} isLoading={loading} colorScheme="purple">
          Login
        </Button>
        {/* </AbsoluteCenter> */}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Copy your token from{' '}
            <Link color='blue' href="https://apps.apple.com/us/app/powerscraper/id6475117998" >POWERSCRAPER Mobile</Link>{' '}
            <br></br>
            <Text fontSize='sm'>{'It is under settings -> copy token'}</Text>
          </ModalHeader>
          <ModalBody>
            <Input
              onChange={(e) => {
                setcurRefKey(e.target.value.replaceAll('"', ''));
              }}
              placeholder="Enter your refresh token"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();

                saveKey();
              }}
            >
              Submit
            </Button>

            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};