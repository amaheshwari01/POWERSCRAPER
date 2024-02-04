import { useEffect, useState } from "react"

import { closestindex, getCourse } from "./scrapehelper"
import { Select } from "chakra-react-select"
import { set } from "firebase/database"
import { Box, Button, HStack, IconButton, Skeleton, Spacer, useColorModeValue } from "@chakra-ui/react"
import DayPlan from "./dayplan"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
interface OneCourseProps {
    courseData: any;
}
export default function OneCourse(props: OneCourseProps) {
    const { courseData } = props
    const [options, setOptions] = useState([])

    const [curquarter, setCurQuarter] = useState("")
    const [dayoptions, setDayOptions] = useState([])
    const [curDay, setCurDay] = useState<number>(null)
    const [updatequarter, setUpdateQuarter] = useState(false)
    const [daytype, setDayType] = useState("")
    const loaderpath = useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")
    //get first num in string
    // const getcurday = () => {
    //     const aday = localStorage.getItem("aday")
    //     const bday = localStorage.getItem("bday")
    //     if (aday && bday) {
    //         const adayarray = JSON.parse(aday)
    //         const bdayarray = JSON.parse(bday)
    //         const adist = closestindex(adayarray, curDay)
    //         const bdist = closestindex(bdayarray, curDay)
    //         if (adist < bdist) {
    //             setDayType("A")
    //         }
    //         else {
    //             setDayType("B")
    //         }
    //     }
    // }
    const getNum = (str: string) => {
        const num = str.match(/\d+/g).map(Number)[0]
        return num
    }

    const parsecourse = (course: any) => {

        // console.log("Re Parsing")
        const options = Object.keys(course)
            .filter((option) => option !== "id")
            .map((option) => {
                return { value: option, label: option }
            }).sort((a, b) => {
                return getNum(a.label) - getNum(b.label)
            })

        // console.log(options)
        if (true) {//(course["id"] === courseurl) {
            setOptions(options)
            setCurQuarter(options[options.length - 1].value)
            setUpdateQuarter(!updatequarter)
            // console.log("Done")
        }
    }
    useEffect(() => {
        if (courseData[curquarter]) {
            // console.log("Setting Day Options")
            // console.log(courseData)

            const dayoptions: string[][] = courseData[curquarter].days
            if (!dayoptions) {
                return
            }
            const options = dayoptions.map((option, index) => {
                return { value: option[0], label: option[1], index: index }
            })
            // console.log(options)
            setDayOptions(options)
            // getcurday()
        }
        else {
            setDayOptions([])

        }

    }, [updatequarter, curquarter])

    useEffect(() => {
        setOptions([])
        setDayOptions([])
        setCurQuarter("")
        setCurDay(null)

        parsecourse(courseData)

    }, [courseData])

    // useEffect(() => {
    //     let curdaynew = ""
    //     let curlabelnew = ""
    //     console.log(daytype)
    //     dayoptions.forEach((option) => {
    //         let currentdate;
    //         if (option.label.includes("/")) {
    //             if (daytype === "A") {
    //                 currentdate = option.label.split("/")[0]
    //             }
    //             else {
    //                 currentdate = option.label.split("/")[0].split(" ")[0] + " " + option.label.split("/")[1]
    //             }
    //         }
    //         else {
    //             currentdate = option.label
    //         }
    //         currentdate = new Date(currentdate)
    //         const today = new Date(new Date().toISOString().split("T")[0])
    //         if (today.getTime() >= currentdate.getTime())
    //             curdaynew = option.value
    //         curlabelnew = option.label



    //     })
    //     console.log(curlabelnew)
    //     setCurDay(curdaynew)
    // }, [daytype])

    return (
        <>
            {dayoptions.length !== 0 ?
                <>

                    <Select
                        placeholder="Select a quarter"
                        onChange={(e) => setCurQuarter(e.value)}
                        defaultValue={options[options.length - 1]}
                        options={options}
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select a day"
                        options={dayoptions}
                        value={(dayoptions[curDay]) ? dayoptions[curDay] : null}
                        onChange={(e) => setCurDay(e.index)}
                        isSearchable={false}
                    />
                    <HStack p={2}>
                        <IconButton aria-label="go back" disabled={curDay === 0} onClick={() => setCurDay(curDay - 1)} icon={<ArrowLeftIcon />} />
                        <Spacer></Spacer>
                        <IconButton aria-label="go forward" disabled={curDay === dayoptions.length - 1} onClick={() => setCurDay(curDay + 1)} icon={<ArrowRightIcon />} />
                    </HStack>
                    {curDay !== null &&
                        <DayPlan dayurl={dayoptions[curDay].value} />
                    }

                </>
                :
                <>{courseData !== "" && < Box position={"fixed"} top={"50%"} left={"50%"} zIndex={0} transform={"translate(-50%,-50%)"}>
                    <iframe scrolling="no" height={"500px"} src={loaderpath} /></Box>
                }</>
            }

        </>
    )

}