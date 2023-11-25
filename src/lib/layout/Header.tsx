import { Box, Button, Flex, Stack, useColorModeValue } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Box boxShadow='md' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>POWERSCRAPER</Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            {/* <Box> */}
            {/* </Box> */}
            <Button >Logout</Button>

            <ThemeToggle />

          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
