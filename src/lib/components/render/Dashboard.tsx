import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import Schedule from './schedule';
import RecentAssignments from './RecentAssignments';
import { useMeasure } from 'react-use';

export default function Dashboard() {
    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
    const [isWrapped, setIsWrapped] = useState(false);
    useEffect(() => {
        // console.log('width', width);

        if (width < 830) {
            setIsWrapped(true)
        }
        else {
            setIsWrapped(false)
        }
    }, [width]);

    // useEffect(() => {
    //     const checkWrap = () => {
    //         const wrapWidth = wrapRef.current.offsetWidth;
    //         let childrenWidth = 0;

    //         wrapRef.current.children.forEach((child) => {
    //             childrenWidth += child.offsetWidth;
    //         });

    //         if (childrenWidth > wrapWidth) {
    //             console.log('Wrapping has occurred');
    //         } else {
    //             console.log('Wrapping has not occurred');
    //         }
    //     };

    //     window.addEventListener('resize', checkWrap);
    //     checkWrap();

    //     return () => window.removeEventListener('resize', checkWrap);
    // }, []);



    return (
        <div ref={ref}>
            <Stack px={4} direction='row' spacing={4}>
                <Button as="a" href="/grades" colorScheme={"purple"}>Grades</Button>
                <Button as="a" href="/moodle" colorScheme={"orange"}>Moodle</Button>
            </Stack>
            {isWrapped ? (
                <Stack spacing={4}>
                    {Widgets.map((widget, index) => (
                        <Box key={index}>
                            {widget}
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Wrap >
                    {Widgets.map((widget, index) => (
                        <WrapItem key={index}>
                            {widget}
                        </WrapItem>
                    ))}
                </Wrap>
            )}
        </div>
    );
}

const Widgets = [
    <Schedule />,
    <Box as="a" href="/grades">
        <RecentAssignments />
    </Box>
];
