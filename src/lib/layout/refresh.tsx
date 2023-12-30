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
import { dropfromRefresh } from '../components/utils/HelperFunctions';
import { scrape } from '~/lib/components/utils/scrape';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')
import axios from 'axios';

const Refresh = () => {
  const toast = useToast()
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
          let gradesToDrop = []
          for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key.startsWith('drop:')) {

              gradesToDrop.push({
                "key": key,
                "value": localStorage.getItem(key)
              })
            }
          }
          let newData = data;
          // console.log(gradesToDrop)
          gradesToDrop.forEach(
            (value) => {
              // console.log(value)
              const section_guid = value["key"].split(":")[1].split("|")[0]
              // console.log(section_guid)
              const category = value["key"].split("|")[1]
              const term = value["key"].split("|")[2]
              // console.log(term)
              const numtodrop = parseInt(value["value"])
              if (numtodrop > 0) {
                newData = dropfromRefresh(section_guid, category, newData, numtodrop, term);
              }
            }
          )

          await setData(newData);

          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          let errorMessage = 'You are not logged in';
          onOpen();
          if (axios.isAxiosError(err)) {
            if (err.response) {
              // The request was made and the server responded with a status code that falls out of the range of 2xx
              const statusCode = err.response.status;
              if (statusCode === 404) {
                errorMessage = 'The requested resource does not exist or has been deleted';
              } else if (statusCode === 401) {
                errorMessage = 'Please login to access this resource';
              }
            } else if (err.request) {
              // The request was made but no response was received
              errorMessage = 'No response received';

            }
          } else {
            // Anything else
            onClose();
            errorMessage = ` ${err.message}`;
          }

          // alert(`Invalid refresh token` + ` ${errorMessage}`);


          // onOpen();
          toast.closeAll()

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
  const updatekey = () => {
    localStorage.setItem('refreshkey', refreshkey);
    setRunfetch(!runfetch);
  };

  useEffect(() => {
    const refkey = localStorage.getItem('refreshkey');
    // console.log(refkey);
    if (!refkey) {
      onOpen();
    } else {
      setRefreshkey(refkey);
      onClose();

      scrapeData(refkey);
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
        Refresh
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Enter your token from{' '}
            <Link color='blue' href="https://github.com/amaheshwari01/Key-Finder/blob/main/Setup%20Instructions.md" >Token Instructions </Link>{' '}
            <br></br>
            <Text fontSize={"sm"}>(it is that long funny string i sent you)</Text>
            <br></br>
            <Text fontSize={"sm"} color={"red"}>Note:DO NOT LOG OUT OF THE POWERSCHOOL MOBILE APP, that will make your login token expire</Text>
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
