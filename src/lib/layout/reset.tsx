import {
  Button,

} from '@chakra-ui/react';
import { useContext } from 'react';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Reset = () => {
  const { setData, default_data } = useContext(AppContext);



  return (
    <>
      <Button
        onClick={() => {
          for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('drop:')) {
              localStorage.removeItem(key);
            }
          }

          setData(default_data)
        }}

      >
        Reset Dropped
      </Button>


    </>
  );
};

export default Reset;
