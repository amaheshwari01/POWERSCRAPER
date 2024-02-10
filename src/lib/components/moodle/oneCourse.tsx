import { useEffect, useState } from "react"

import { closestindex, getCourse } from "./scrapehelper"
import { Select } from "chakra-react-select"
import { set } from "firebase/database"
import { Box, Button, HStack, IconButton, Skeleton, Spacer, useColorModeValue } from "@chakra-ui/react"
import DayPlan from "./dayplan"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { parse } from "path"
interface OneCourseProps {
    courseData: any;
}
interface pasedday {
    quarter: {
        value: string,
        label: string
    },
    day: number
}

export default function OneCourse(props: OneCourseProps) {
    const { courseData } = props
    const [options, setOptions] = useState([])

    const [curquarter, setCurQuarter] = useState({ value: "", label: "" })
    const [dayoptions, setDayOptions] = useState([])
    const [curDay, setCurDay] = useState<number>(null)
    const [updatequarter, setUpdateQuarter] = useState(false)
    const loaderpath = useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")

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
        setOptions(options)
        if (curquarter.value === "") setCurQuarter(options[options.length - 1])
        // else (setCurQuarter(JSON.parse(JSON.stringify(curquarter))))
        // console.log(curquarter)
        // console.log(options[options.length - 1])
        // setCurQuarter(options[options.length - 1])

        setUpdateQuarter(!updatequarter)

    }
    useEffect(() => {
        if (courseData[curquarter.value]) {
            // console.log("Setting Day Options")
            // console.log(courseData)

            const dayoptions: string[][] = courseData[curquarter.value].days
            // console.log(JSON.stringify(dayoptions.map((option, index) => (option[1]))))
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
    //converts the date to the current year
    const fixday = (date: string) => {
        const newDate = new Date(date)
        const month = newDate.getMonth()
        const curyear = new Date().getFullYear()
        const curmonth = new Date().getMonth()
        if (month > 6 && curmonth < 6) {
            // return curyear - 1
            newDate.setFullYear(curyear - 1)
        }
        else {
            // return curyear
            newDate.setFullYear(curyear)
        }
        return newDate
    }
    const parseDay = (course: any) => {
        const bdays = localStorage.getItem("bdaymoodle")
        const isAday = !bdays.includes(courseData.id)
        console.log(isAday)
        // cosnt 
        let parsedcurrentDay: pasedday = {
            quarter: {
                value: "",
                label: ""
            },
            day: null
        }
        for (const key in courseData) {
            // console.log(key)
            if (key === "id") {
                continue
            }
            for (const day of courseData[key].days) {
                // console.log(day[1])
                // if(day)
                const today = new Date()
                let datdate: Date;
                today.setHours(0, 0, 0, 0)
                // const dayurl = day[0]
                const dayindex = courseData[key].days.indexOf(day)
                const dayname = day[1].split("(")[0].trim()
                const quarter = key
                const quarterurl = courseData[key].id
                //some classes have a/b days
                if (dayname.includes("/")) {
                    const darr = dayname.split("/")
                    const hasNonNumericOrSpace = (str) => /\D/.test(str);
                    if (isAday) {
                        datdate = fixday(darr[0])
                    }
                    else {
                        // datdate = fixday(darr[1])
                        if (hasNonNumericOrSpace(darr[1])) {
                            datdate = fixday(darr[1])
                        }
                        else {
                            datdate = fixday(darr[0].split(" ")[0] + " " + darr[1])
                        }
                    }

                }
                else {
                    datdate = fixday(dayname)
                }
                // console.log(datdate)
                // console.log(dayindex)
                // const 
                if (today.getTime() >= datdate.getTime()) parsedcurrentDay = { quarter: { value: quarter, label: quarter }, day: dayindex }




            }
        }
        setCurQuarter(parsedcurrentDay.quarter)
        console.log(parsedcurrentDay.quarter)
        setCurDay(parsedcurrentDay.day)


    }
    useEffect(() => {
        setOptions([])
        setDayOptions([])
        setCurQuarter({
            value: "",
            label: ""

        })
        setCurDay(null)
        parseDay(courseData)

        parsecourse(courseData)

    }, [courseData])

    return (
        <>
            {dayoptions.length !== 0 ?
                <>

                    <Select
                        placeholder="Select a quarter"
                        onChange={(e) => {
                            setCurQuarter({ value: e.value, label: e.label })
                            setCurDay(null)
                        }}
                        defaultValue={curquarter}
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
                        <IconButton aria-label="go back" isDisabled={curDay === 0 || curDay === null} onClick={() => setCurDay(curDay - 1)} icon={<ArrowLeftIcon />} />
                        <Spacer></Spacer>
                        <IconButton aria-label="go forward" isDisabled={curDay === dayoptions.length - 1} onClick={() => setCurDay(curDay + 1)} icon={<ArrowRightIcon />} />
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