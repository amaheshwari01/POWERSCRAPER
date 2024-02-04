import { Box, HStack, Spacer, VStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import OneCourse from "./oneCourse";
import { getCourse } from "./scrapehelper";
interface getClassesProps {
    classData: any
}
export default function MoodleFull(props: getClassesProps) {
    const { classData } = props
    const toast = useToast()
    const loaderpath = useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")

    const [courses, setCourses] = useState([])
    const [randkey, setRandKey] = useState(0)
    const [curCourse, setCurCourse] = useState("")
    const [courseData, setCourseData] = useState({})
    const getallcourses = async () => {
        // classData.forEach(element => {
        //     getCourse(element[0])
        // });
    }

    useEffect(() => {
        // console.log(classData)
        const courses = classData.map((course) => {
            return { value: course[0], label: course[1] }
        })
        setCourses(courses)
        getallcourses()

    }, [])
    const runGetCourse = async (courseurl: string) => {
        console.log("Running get course")
        const newcoursedata = localStorage.getItem(courseurl)
        if (newcoursedata) {
            setCourseData(JSON.parse(newcoursedata))
            toast({
                title: "Checking for changes",
                status: 'loading',
                duration: null,
            })
        }
        else {
            // toast({
            //     title: "Loading Course Data",
            //     status: 'loading',
            //     duration: null,
            // })
        }
        try {
            const course = await getCourse(courseurl)
            toast.closeAll()
            if (JSON.stringify(course) !== (newcoursedata)) {
                if (newcoursedata) {
                    toast({
                        title: "Found Change",
                        description: "Updating course data",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                }
                else {
                    // toast({
                    //     title: "Got Data",
                    //     status: 'success',
                    //     duration: 5000,
                    //     isClosable: true,
                    // })
                }
                console.log(course)
                console.log(courseData)
                console.log("Setting Course Data cuz me found change")
                setRandKey(Math.random())
                setCourseData(course)
            }
            else {
                console.log("No change")
                toast({
                    title: "No Change",
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
        catch (e) {
            console.log(e)
            toast.closeAll()
            toast({
                title: "Error Loading Course Data",
                description: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    useEffect(() => {
        setCourseData({})
        if (curCourse !== "") {
            runGetCourse(curCourse)
        }
    }, [curCourse])

    return (
        <>
            <Select
                placeholder="Select a course"
                onChange={(e) => setCurCourse(e.value)}
                options={courses}
                isSearchable={false}

            />
            {Object.keys(courseData).length !== 0 ?
                <OneCourse key={randkey} courseData={courseData} />
                :
                <> {curCourse !== "" &&
                    < Box position={"fixed"} top={"50%"} left={"50%"} zIndex={0} transform={"translate(-50%,-50%)"}>
                        <iframe scrolling="no" height={"50%"} src={loaderpath} /></Box>}</>
            }


        </>
    )
}