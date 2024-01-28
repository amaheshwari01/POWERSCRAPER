
import { Box, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import parse from 'html-react-parser';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

import { getDay } from "./scrapehelper"

interface DayPlanProps {
    dayurl: string
}
export default function DayPlan(props: DayPlanProps) {
    const { dayurl } = props
    const [daydata, setDayData] = useState("")
    const dayget = async () => {
        const day: string = await getDay(dayurl)
        console.log(day)
        setDayData(day.replace(/(vspace|hspace)="[^"]*"/g, ''))
        // const jsxCode = await mdxCompile(day);
        // setDayData(jsxCode)
    }
    useEffect(() => {
        if (dayurl !== "") {

            dayget()
        }


    }, [dayurl]


    )
    return (
        <Box
            borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Button colorScheme="blue" as="a" href={dayurl}>Go to lesson Plan Page</Button>
            <ReactMarkdown components={ChakraUIRenderer()} children={daydata} rehypePlugins={[rehypeRaw]} />


        </Box>
    )
}
//     <Text fontSize='2xl' fontWeight='bold' textAlign='center' >Day Plan</Text>
//             <Box p='8'>
//                 {parse(daydata)}
//             </Box>
// {/* <iframe srcDoc={daydata}>

//             </iframe> */}