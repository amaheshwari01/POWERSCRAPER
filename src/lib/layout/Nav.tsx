import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
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

import { useEffect, useState } from 'react';

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const [topPadding, setTopPadding] = useState(2);
    useEffect(() => {
        SafeArea.getSafeAreaInsets().then(({ insets }) => {
            console.log(insets);
            setTopPadding(Math.max(insets.top, 2))
        });
        // when safe-area changed
        SafeArea.addListener('safeAreaChanged', data => {
            const { insets } = data;
            setTopPadding(insets.top);
            console.log(insets)
        });
    }, []);

    return (
        <Box>
            {
                topPadding
            }
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH="60px"
                pt={{ base: topPadding }}
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
                        <DesktopNav />
                    </Flex>
                </Flex>

                <ThemeToggle />
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    return (
        <Stack direction="row" spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} pt={2} pb={2}>
                    {navItem.Thing}
                    {/* <Button
                                as="a"
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'lg'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,

                                }}>
                                {navItem.label}
                            </Button> */}
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
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

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'GPA',
        Thing: <Gpa />,
    },
    {
        label: 'Reset',
        Thing: <Reset />,
    },
    {
        label: 'Refresh',
        Thing: <Refresh />,
    },
    {
        label: 'Logout',
        Thing: <Logout />,
    },
    {
        label: 'CopyToken',
        Thing: <CopyToken />,
    },
];
