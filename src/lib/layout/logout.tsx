import {
  Button,

} from '@chakra-ui/react';
import { useContext } from 'react';
import AppContext from '~/lib/utils/AppContext';
const Logout = () => {
  const { setRefreshToken } = useContext(AppContext);
  const logout = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('data')
    localStorage.removeItem("oauth2Expirey")

    localStorage.removeItem("dateUpdated")
    localStorage.removeItem("oauth2response")

    localStorage.removeItem("sched")
    localStorage.removeItem("weights")
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.startsWith('drop:')) {
        localStorage.removeItem(key);
      }
    }
    setRefreshToken('');

    // localStorage.clear()
    window.location.reload();
  };

  return (
    <>

      <Button colorScheme={"red"} onClick={logout}>Logout of Powerschool</Button>

    </>
  );
};

export default Logout;
