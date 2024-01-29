import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import OneCourse from "./oneCourse";
interface getClassesProps {
    classData: any
}
export default function MoodleFull(props: getClassesProps) {
    const { classData } = props
    const [couses, setCourses] = useState([])
    const [curCourse, setCurCourse] = useState("")
    useEffect(() => {
        console.log(classData)
        const courses = classData.map((course) => {
            return { value: course[0], label: course[1] }
        })
        setCourses(courses)
    }, [])
    // useEffect

    return (
        <>
            <Select
                placeholder="Select a course"
                onChange={(e) => setCurCourse(e.value)}
                options={couses}
                isSearchable={false}

            />
            <OneCourse courseurl={curCourse} />


        </>
    )
}