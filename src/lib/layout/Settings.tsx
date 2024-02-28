import { SettingsIcon } from '@chakra-ui/icons';
import { Button, Center, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode, useDisclosure } from '@chakra-ui/react';
import CopyToken from './copytoken';
import Gpa from './gpa';
import Logout from './logout';
import Refresh from './refresh';
import Reset from './reset';
import MoodleOut from './moodlelogout';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import CopyWebsite from './copywebsitelink';


const Settings = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleClose = () => {
        onClose()
    }


    const [NAV_ITEMS, setNAV_ITEMS] = useState<Array<NavItem>>([]);
    useEffect(() => {

        window.location.pathname == "/moodle" && setNAV_ITEMS(MOODLE_NAV)

        window.location.pathname == "/grades" && setNAV_ITEMS(POWER_NAV)
        window.location.pathname == "/" && setNAV_ITEMS(HOME_NAV)

    }, [window.location.pathname])

    return (
        <>
            <IconButton
                aria-label="theme toggle"
                icon={<SettingsIcon />}
                onClick={onOpen}
            />
            <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings/Tools</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center p={2}><ThemeToggle /></Center>
                        {NAV_ITEMS.map((item) =>
                            <Center key={item.label} p={2}>{item.Thing}</Center>

                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


export default Settings;
interface NavItem {
    label: string;
    Thing?: JSX.Element;
}

const HOME_NAV: Array<NavItem> = [
    {
        label: 'CopyToken',
        Thing: <CopyToken />,
    },
    {
        label: 'website',
        Thing: <CopyWebsite />,
    },
    {
        label: "support",
        Thing: <Button as="a" href='/support.html' target="_blank" rel="noopener noreferrer">Support</Button>
    },

    {
        label: 'Logout',
        Thing: <Logout />,
    },

];

const MOODLE_NAV: Array<NavItem> = [
    {
        label: 'website',
        Thing: <CopyWebsite />,
    },
    {
        label: "support",
        Thing: <Button as="a" href='/support.html' target="_blank" rel="noopener noreferrer">Support</Button>
    },
    {
        label: 'Logout',
        Thing: <MoodleOut />,
    },
];
const POWER_NAV: Array<NavItem> = [

    {
        label: 'Reset',
        Thing: <Reset />,
    },

    {
        label: 'CopyToken',
        Thing: <CopyToken />,
    },
    {
        label: 'website',
        Thing: <CopyWebsite />,
    },
    {
        label: "support",
        Thing: <Button as="a" href='/support.html' target="_blank" rel="noopener noreferrer">Support</Button>
    },

    {
        label: 'Logout',
        Thing: <Logout />,
    },
];