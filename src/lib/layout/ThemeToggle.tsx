import { Button, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      aria-label="theme toggle"


      onClick={toggleColorMode}
    >{colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />} &nbsp; &nbsp; Toggle Theme</Button>
  );
};

export default ThemeToggle;
