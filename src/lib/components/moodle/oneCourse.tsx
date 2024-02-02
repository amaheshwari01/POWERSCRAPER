import { useEffect, useState } from "react"

import { closestindex, getCourse } from "./scrapehelper"
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
    const [daytype, setDayType] = useState("")
    const loaderpath = useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")
    //get first num in string
    const getcurday = () => {
        const aday = localStorage.getItem("aday")
        const bday = localStorage.getItem("bday")
        if (aday && bday) {
            const adayarray = JSON.parse(aday)
            const bdayarray = JSON.parse(bday)
            const adist = closestindex(adayarray, curDay)
            const bdist = closestindex(bdayarray, curDay)
            if (adist < bdist) {
                setDayType("A")
            }
            else {
                setDayType("B")
            }
        }
    }
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

        }


    }
    const parsecourse = (course: any) => {

        setCourseData(course)
        const options = Object.keys(course)
            .filter((option) => option !== "id")
            .map((option) => {
                return { value: option, label: option }
            }).sort((a, b) => {
                return getNum(a.label) - getNum(b.label)
            })


        if (course["id"] === courseurl) {
            setOptions(options)
            setCurQuarter(options[options.length - 1].value)
            setUpdateQuarter(!updatequarter)
        }
    }
    useEffect(() => {
        if (courseData[curquarter]) {

            const dayoptions = courseData[curquarter].days
            if (!dayoptions) {
                return
            }
            const options = dayoptions.map((option) => {
                return { value: option[0], label: option[1] }
            })
            setDayOptions(options)
            getcurday()
        }

    }, [updatequarter, curquarter])

    useEffect(() => {
        setCourseData({})
        setDayOptions([])
        setOptions([])
        setCurQuarter("")
        setCurDay("")

        const coursedata = localStorage.getItem(courseurl)
        if (coursedata) {
            parsecourse(JSON.parse(coursedata))
        }

        courseurl && courseget()
    }, [courseurl])

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
                        defaultValue={dayoptions.filter((option) => option.value === curDay)[0]}
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