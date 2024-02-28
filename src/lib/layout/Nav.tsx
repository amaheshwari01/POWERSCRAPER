import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    Image,
    useBreakpointValue,
    useDisclosure,
    Spacer,
} from '@chakra-ui/react';

import CopyToken from './copytoken';
import Gpa from './gpa';
import Logout from './logout';
import Refresh from './refresh';
import Reset from './reset';
import ThemeToggle from './ThemeToggle';
import { SafeArea } from 'capacitor-plugin-safe-area';

import { useEffect, useRef, useState } from 'react';
import MoodleOut from './moodlelogout';
import { useIsOverflow } from './useIsOverflow';
import Settings from './Settings';
import CopyWebsite from './copywebsitelink';
import { Capacitor } from '@capacitor/core';

export default function WithSubnavigation() {
    const ref = useRef();
    const isOverflow = useIsOverflow(ref);

    const { isOpen, onToggle } = useDisclosure();
    const [topPadding, setTopPadding] = useState(2);
    const [NAV_ITEMS, setNAV_ITEMS] = useState<Array<NavItem>>([]);
    useEffect(() => {
        console.log(isOverflow)
    }, [isOverflow])
    useEffect(() => {
        if (window.location.pathname == "/moodle") {
            setNAV_ITEMS(MOODLE_NAV)
        }
        else setNAV_ITEMS(window.location.pathname == "/grades" ? POWER_NAV : [])

    }, [window.location.pathname])

    useEffect(() => {
        SafeArea.getSafeAreaInsets().then(({ insets }) => {
            // alert(JSON.stringify(insets));
            setTopPadding(Math.max(insets.top, 2))
        });
        // when safe-area changed
        SafeArea.addListener('safeAreaChanged', data => {
            const { insets } = data;
            setTopPadding(insets.top);
            // alert(JSON.stringify(insets));
        });
    }, []);

    return (
        <Box>

            <Flex
                ref={ref}

                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH="60px"
                pt={topPadding + "px"}
                pb={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle="solid"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align="center"
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant="ghost"
                        aria-label="Toggle Navigation"
                    />
                </Flex>

                <Spacer display={{ base: 'flex', md: 'none' }} />
                <a href="/">POWERSCRAPER</a>
                <Spacer pr="6%" display={{ base: 'flex', md: 'none' }} />
                <Flex
                    display={{ base: 'none', md: 'flex' }}
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Flex ml={10}>
                        <DesktopNav NAV_ITEMS={NAV_ITEMS} />
                    </Flex>
                </Flex>

                <Settings />
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav NAV_ITEMS={NAV_ITEMS} />
            </Collapse>
        </Box>
    );
}
interface NavProps {
    NAV_ITEMS: Array<NavItem>;
}
const DesktopNav = (props: NavProps) => {
    const platform = Capacitor.getPlatform();

    return (
        <Stack direction="row" spacing={4}>
            {props.NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} pt={2} pb={2}>
                    {navItem.Thing}

                </Box>
            ))}
            {platform !== 'web' &&
                <Box pt={2} pb={2}>
                    <CopyWebsite />
                </Box>
            }

        </Stack>
    );
};

const MobileNav = (props: NavProps) => {
    //get device from cpaacitor
    // const { Device } = Plugins;
    // const { device } = useDevice();
    const platform = Capacitor.getPlatform();

    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {props.NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
            {/* <CopyWebsite /> */}
            <Box pt={2} pb={2}>
                <CopyWebsite />
            </Box>


        </Stack>
    );
};

const MobileNavItem = ({ Thing }: NavItem) => {
    return (
        <Box pt={2} pb={2}>
            {Thing}
        </Box>
    );
};

interface NavItem {
    label: string;
    Thing?: JSX.Element;
}


const MOODLE_NAV: Array<NavItem> = [
    {
        label: "grades",
        Thing: <Button colorScheme={"purple"} as="a" href='/grades'>Grades</Button>
    },

    {
        label: "home",
        Thing: <Button colorScheme={"green"} as="a" href='/'>Home</Button>
    }

];


const POWER_NAV: Array<NavItem> = [
    {
        label: 'GPA',
        Thing: <Gpa />,
    },

    {
        label: 'Refresh',
        Thing: <Refresh />,
    },

    {
        label: "moodle",
        Thing: <Button colorScheme={"orange"} as="a" href='/moodle'>Moodle</Button>
    },
    {

        label: "home",
        Thing: <Button colorScheme={"green"} as="a" href='/'>Home</Button>
    },

];

