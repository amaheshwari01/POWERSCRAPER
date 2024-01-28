import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { PasswordField } from './PasswordField'
import { useEffect, useState } from 'react'
interface LoginProps {
  password: string
  username: string
  setPassword: any
  setUsername: any
  handleSubmit: any
}
const Login = (props: LoginProps) => {
  const { password, username, setPassword, setUsername, handleSubmit } = props



  return (
    <>
      <Container >
        <Stack spacing="8">

          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            // bg={{ base: 'transparent', sm: 'bg.surface' }}
            // boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </FormControl>
                <PasswordField value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </Stack>
              <HStack justify="space-between">

              </HStack>
              <Stack spacing="6">
                <Button onClick={() => {
                  handleSubmit(username, password)

                }}>Sign in</Button>

              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>

    </>
  )
}
export default Login