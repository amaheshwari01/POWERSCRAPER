import {
  Text,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { scrape } from '~/lib/components/scrape';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Refresh = () => {
  const { setData, setDefault_data, data } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [refreshkey, setRefreshkey] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [runfetch, setRunfetch] = useState(false);

  const scrapeData = async (refkey: string) => {
    setLoading(true);

    if (refkey) {
      scrape(refkey)
        .then(async (data) => {
          await setDefault_data(data);
          await setData(data);
          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          alert(`Invalid refresh token` + ` ${err}`);
          setLoading(false);
          setRefreshkey('');
          // onOpen();
        });
    }
  };
  const updatekey = () => {
    localStorage.setItem('refreshkey', refreshkey);
    setRunfetch(!runfetch);
  };

  useEffect(() => {
    const refkey = localStorage.getItem('refreshkey');
    console.log(refkey);
    if (!refkey) {
      onOpen();
    } else {
      setRefreshkey(refkey);
      scrapeData(refkey);
      onClose();
    }
  }, [runfetch]);



  return (
    <>
      <Button
        isLoading={loading}
        onClick={() => {
          setRunfetch(!runfetch);
        }}
      >
        Refresh/Reset
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Enter your token from{' '}
            <Link color='blue' href="https://github.com/amaheshwari01/Key-Finder/releases" >Keyfinder </Link>{' '}
            <br></br>
            <Text fontSize={"sm"}>(it is that long funny string i sent you)</Text>

          </ModalHeader>
          <ModalBody>
            <Input
              onChange={(e) => {
                setRefreshkey(e.target.value.replaceAll('"', ''));
              }}
              placeholder="Enter your refresh token"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();

                updatekey();
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

export default Refresh;
