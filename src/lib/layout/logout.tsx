import {
  Button,

} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { scrape } from '~/lib/components/scrape';
import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')

const Logout = () => {

  const logout = () => {
    localStorage.removeItem('refreshkey');
    window.location.reload();
  };

  return (
    <>

      <Button onClick={logout}>Logout</Button>

    </>
  );
};

export default Logout;
