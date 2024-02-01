import { useEffect, useState } from "react"

import { getCourse } from "./scrapehelper"
import { Select } from "chakra-react-select"
import { set } from "firebase/database"
import { Box, Skeleton, useColorModeValue } from "@chakra-ui/react"
import DayPlan from "./dayplan"
interface OneCourseProps {
    courseurl: string
}
export default function OneCourse(props: OneCourseProps) {
    const { courseurl } = props
    const [courseData, setCourseData] = useState({})
    const [options, setOptions] = useState([])
    const [curquarter, setCurQuarter] = useState("")
    const [dayoptions, setDayOptions] = useState([])
    const [curDay, setCurDay] = useState("")
    const [updatequarter, setUpdateQuarter] = useState(false)
    const loaderpath = useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")
    //get first num in string
    const getNum = (str) => {
        const num = str.match(/\d+/g).map(Number)[0]
        return num
    }
    const courseget = async () => {

        const course = await getCourse(courseurl)
        if (JSON.stringify(course) !== JSON.stringify(courseData)) {

            parsecourse(course)
        }
        else {
            console.log("same data")

        }


    }
    const parsecourse = (course: any) => {

        console.log(course)
        setCourseData(course)
        const options = Object.keys(course)
            .filter((option) => option !== "id")
            .map((option) => {
                return { value: option, label: option }
            }).sort((a, b) => {
                return getNum(a.label) - getNum(b.label)
            })

        console.log(options)

        if (course["id"] === courseurl) {
            console.log("setting options")
            setOptions(options)
            console.log(options[options.length - 1].value)
            setCurQuarter(options[options.length - 1].value)
            setUpdateQuarter(!updatequarter)
        }
    }
    useEffect(() => {
        if (courseData[curquarter]) {
            console.log("setting day options")

            const dayoptions = courseData[curquarter].days
            console.log(dayoptions)
            if (!dayoptions) {
                return
            }
            const options = dayoptions.map((option) => {
                return { value: option[0], label: option[1] }
            })
            setDayOptions(options)
        }

    }, [updatequarter])

    useEffect(() => {
        setCourseData({})
        setDayOptions([])
        setOptions([])
        setCurQuarter("")
        setCurDay("")

        const coursedata = localStorage.getItem(courseurl)
        if (coursedata) {
            console.log("using local data")
            parsecourse(JSON.parse(coursedata))
        }

        courseurl && courseget()
    }, [courseurl])
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
                        onChange={(e) => setCurDay(e.value)}
                        isSearchable={false}
                    />
                    <DayPlan dayurl={curDay} />

                </>
                :
                <>{courseurl !== "" && < Box position={"fixed"} top={"50%"} left={"50%"} zIndex={0} transform={"translate(-50%,-50%)"}>
                    <iframe scrolling="no" height={"500px"} src={loaderpath} /></Box>
                }</>
            }

        </>
    )

}