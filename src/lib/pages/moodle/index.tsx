import { useEffect, useState } from "react"
import axios from "axios"
import { getClasses } from "../../components/moodle/scrapehelper"
import Login from "~/lib/components/moodle/login"
import { Select } from "chakra-react-select"
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure, useToast } from "@chakra-ui/react"
import MoodleFull from "~/lib/components/moodle/full"
import { set } from "firebase/database"
export default function Moodle() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showButton, setShowButton] = useState(true)
    const toast = useToast()
    const [loggedIn, setLoggedIn] = useState(false)
    const [classData, setClassData] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleSubmit = async (username, password) => {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        setShowButton(false)
        onClose()
        const classes = getClasses()
        toast.promise(classes, {
            success: { title: 'Logged in!', description: '' },
            error: { title: 'Invalid Login', description: 'Please try agian' },
            loading: { title: 'Logging in', description: 'Please wait' },
        })
        try {
            const res = await classes
            // console.log(res)
            setClassData(res)
            localStorage.setItem("classData", JSON.stringify(res))

            setLoggedIn(true)
            // conso
            // setClassData(res.data.classes)
        }
        catch (e) {
            console.log(e.response.data.message)
            localStorage.removeItem("username")
            localStorage.removeItem("password")
            localStorage.removeItem("cookies")
            setShowButton(true)
            onOpen()
        }


    }
    const refreshMoodle = () => {
        const oldPwd = localStorage.getItem("password")
        const oldUser = localStorage.getItem("username")
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.removeItem("cookies")
        localStorage.removeItem("classData")
        let keystoremove = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('https')) {
                keystoremove.push(key)
            }
        }
        keystoremove.forEach((key) => {
            localStorage.removeItem(key)
        });
        handleSubmit(oldUser, oldPwd)
        window.location.reload();
    }
    useEffect(() => {
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")
        setUsername(username ? username : "")
        setPassword(password ? password : "")
        if (!username || !password) {
            onOpen()
        }
        else {
            const classdata = localStorage.getItem("classData")
            if (classdata) {
                setClassData(JSON.parse(classdata))
                setLoggedIn(true)
            }
            else {
                handleSubmit(username, password)
            }


        }

    }, [])

    return (
        <div>
            {!loggedIn ?
                <>
                    {showButton &&
                        < Box position={"fixed"} top={"50%"} left={"50%"} zIndex={2} transform={"translate(-50%,-50%)"}>
                            {/* <AbsoluteCenter> */}
                            <Button onClick={onOpen} colorScheme="orange">
                                Login to Moodle
                            </Button>
                            {/* </AbsoluteCenter> */}
                        </Box>}</> :
                <>
                    <Flex direction="column" minHeight="100vh">
                        <Box flex="1">
                            {/* MoodleFull component will take the available space above the button */}
                            <MoodleFull classData={classData} />
                        </Box>
                        <Button onClick={refreshMoodle} mb={4} alignSelf="center">
                            Reset Moodle
                        </Button>
                    </Flex>
                </>
            }


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Learn@vcs.net Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Login setPassword={setPassword} setUsername={setUsername} username={username} password={password} handleSubmit={handleSubmit} />
                    </ModalBody>

                </ModalContent>
            </Modal>
        </div >
    )
}