import {
  Button,

} from '@chakra-ui/react';

const Logout = () => {

  const logout = () => {
    localStorage.removeItem('refreshkey');
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.startsWith('drop:')) {
        localStorage.removeItem(key);
      }
    }

    // localStorage.clear()
    window.location.reload();
  };

  return (
    <>

      <Button onClick={logout}>Logout</Button>

    </>
  );
};

export default Logout;
