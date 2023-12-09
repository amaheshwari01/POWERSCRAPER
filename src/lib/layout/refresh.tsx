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
        });
    }
  };
  const updatekey = () => {
    localStorage.setItem('refreshkey', refreshkey);
    setRunfetch(!runfetch);
    onClose();
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

  const logout = () => {
    localStorage.removeItem('refreshkey');
    setRunfetch(!runfetch);
  };

  return (
    <>
      {Object.keys(data).length !== 0 &&
        <Text p={2} fontSize={'sm'}>
          GPA:{data.data.student.currentGPA}
        </Text >
      }
      <Button
        isLoading={loading}
        onClick={() => {
          setRunfetch(!runfetch);
        }}
      >
        Refresh/Reset
      </Button>
      <Button onClick={logout}>Logout</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Enter your refresh token from{' '}
            <a href="https://github.com/amaheshwari01/Key-Finder/releases" />{' '}
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
