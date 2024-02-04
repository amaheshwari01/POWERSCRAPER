
import { Box, Button, IconButton, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import parse from 'html-react-parser';
import { getDay } from "./scrapehelper"
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface DayPlanProps {
    dayurl: string
}
export default function DayPlan(props: DayPlanProps) {
    const { dayurl } = props
    const [daydata, setDayData] = useState("")
    const loaderpath = useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")
    const dayget = async () => {
        const day: string = await getDay(dayurl)
        // console.log(day)
        setDayData(day)
        // const jsxCode = await mdxCompile(day);
        // setDayData(jsxCode)
    }
    useEffect(() => {
        setDayData("")
        if (dayurl !== "") {

            dayget()
        }


    }, [dayurl]


    )
    return (
        <Box
            borderWidth='1px' borderRadius='lg' overflow='none' width={"full"}>
            {daydata !== "" ?
                <>
                    <Prose p={"6"} wordBreak={"break-word"} dangerouslySetInnerHTML={{ __html: daydata }} />
                    <IconButton aria-label="go to lesson plan" icon={<ExternalLinkIcon />} colorScheme="blue" as="a" href={dayurl} />

                    {/* <ReactMarkdown className="text" components={ChakraUIRenderer()} children={daydata} rehypePlugins={[rehypeRaw]} /> */}
                </> :
                <>{dayurl !== "" &&
                    < Box position={"fixed"} top={"50%"} left={"50%"} zIndex={0} transform={"translate(-50%,-50%)"}>
                        <iframe scrolling="no" height={"50%"} src={loaderpath} /></Box>}</>

            }

        </Box >
    )
}
