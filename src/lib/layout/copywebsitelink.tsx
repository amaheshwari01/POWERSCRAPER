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
  Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')
interface copyProps {
  setClose: any;
}

const CopyWebsite = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const refresh_token = localStorage.getItem('refresh_token')

  const [authPayload, setAuthPayload] = useState<string>('');
  const copy = async () => {
    const refresh_token = localStorage.getItem('refresh_token')
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    //add whatever is not null to the authpayklod object
    const payload = {
      refresh_token: refresh_token,
      username: username,
      password: password
    }
    // console.log(payload)
    //base64 encode the payload url save e
    // setAuth
    const encoded = btoa(JSON.stringify(payload))
    // console.log(encoded)
    setAuthPayload(encoded)
    if (refresh_token) {

      await Clipboard.write({
        string: "https://power.aayanmaheshwari.com/?auth=" + encoded,
      });
      toast({
        title: 'Copied Link',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onOpen();
      setTimeout(onClose, 6000)

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
    <><Button onClick={copy}>Website Link</Button>
      {/* <Box position={"fixed"} top={"50%"} left={"50%"} transform={"translate(-50%,-50%)"}> */}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.6)" // Semi-transparent black overlay
          backdropFilter="blur(4px)" // Blur effect for a softer look
        />
        <ModalContent
          borderRadius="8px" // Rounded corners for a softer feel
          boxShadow="md" // Subtle drop shadow for depth
        // bg="white" // Bright white background
        >
          {/* Remove header for cleaner look */}
          <ModalCloseButton ml={4} mt={4} size="sm" />
          <ModalBody fontSize="md" lineHeight="tall" px={8} py={6}>
            <Text as="p" marginBottom={5} fontWeight="bold">
              Your login link has been copied!
            </Text>
            <Text as="p" marginBottom={4}>
              It is a custom link that will automatically log you in to the website.
            </Text>
            <Text as="p" marginBottom={4}>
              You can visit {' '}
              <Link
                color="blue.500" // Lighter blue for link
                href={"https://power.aayanmaheshwari.com/?auth=" + authPayload}
                fontWeight="bold"
                _hover={{ textDecoration: "underline" }} // Subtle underline on hover
              >
                power.aayanmaheshwari.com
              </Link>
              {' '}
              anytime to use it.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* </Box> */}
    </>

  );
};

export default CopyWebsite;
