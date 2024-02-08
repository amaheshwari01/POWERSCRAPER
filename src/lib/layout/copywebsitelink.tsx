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
  ModalCloseButton,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const CopyWebsite = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refresh_token } = useContext(AppContext);
  const copy = async () => {
    if (refresh_token !== '') {
      await Clipboard.write({
        string: "https://power.aayanmaheshwari.com/?token=" + refresh_token,
      });
      onOpen();
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

  return (
    <><Button onClick={copy}>Copy Website Link</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Note:</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm" lineHeight="tall">
            <Text as="p" marginBottom="2">
              Your personal login link has been copied. Share it responsibly.
            </Text>
            <Text as="p" marginBottom="2">
              Visit <Link color='blue' href="https://power.aayanmaheshwari.com" >power.aayanmaheshwari.com</Link> to access the grade calculator without logging in again.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
};

export default CopyWebsite;
