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
  const { runFetch, setRunFetch, loading } =
    useContext(AppContext);


  return (
    <Button
      isLoading={loading}
      onClick={() => {
        setRunFetch(!runFetch);
      }}
    >
      Refresh
    </Button>
  );
};

export default Refresh;
