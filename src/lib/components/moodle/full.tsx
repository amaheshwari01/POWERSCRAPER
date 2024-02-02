import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import OneCourse from "./oneCourse";
import { getCourse } from "./scrapehelper";
interface getClassesProps {
    classData: any
}
export default function MoodleFull(props: getClassesProps) {
    const { classData } = props
    const [courses, setCourses] = useState([])
    const [curCourse, setCurCourse] = useState("")
    const getallcourses = async () => {
        classData.forEach(element => {
            getCourse(element[0])
        });
    }

    useEffect(() => {
        // console.log(classData)
        const courses = classData.map((course) => {
            return { value: course[0], label: course[1] }
        })
        setCourses(courses)
        getallcourses()

    }, [])

    // useEffect

    return (
        <>
            <Select
                placeholder="Select a course"
                onChange={(e) => setCurCourse(e.value)}
                options={courses}
                isSearchable={false}

            />
            <OneCourse courseurl={curCourse} />


        </>
    )
}