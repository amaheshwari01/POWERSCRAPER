import { Clipboard } from '@capacitor/clipboard';
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
import { useContext, useEffect, useState } from 'react';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const CopyToken = () => {
  const toast = useToast();
  const { refresh_token } = useContext(AppContext);
  const copy = async () => {
    if (refresh_token !== '') {
      await Clipboard.write({
        string: refresh_token,
      });
      toast({
        title: 'Copied Token',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Not Logged in yet :(',
        description: 'Please Login to get your token',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return <Button onClick={copy}>Copy Token</Button>;
};

export default CopyToken;
