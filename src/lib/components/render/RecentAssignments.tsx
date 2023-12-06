import { Card, CardBody, Stack, StackDivider, Heading, Button, Box, EditableTextareaProps, As } from "@chakra-ui/react"
import { useContext, useEffect, useState } from 'react';
import AppContext from '~/lib/utils/AppContext';
import type { AssignmentType } from 'global';
import Assignment from "./Assignment";
interface AssignmentArray {
    assignment: AssignmentType;
    ClassName: string;
}
const RecentAssignments = () => {
    const { data } = useContext(AppContext);
    const [RecentAssignment, setRecentAssignment] = useState([]);
    useEffect(() => {
        const sections = data.data.student.sections;
        const RecentAssignment: AssignmentArray[] = [];
        sections.forEach((section) => {
            section.assignments.forEach((assignment: AssignmentType) => {
                // console.log(assignment);
                //if entered in the last week
                const date = new Date(assignment.dueDate);
                const today = new Date();
                if (today.getTime() - date.getTime() < 604800000 && assignment.pointsEarned !== null) {
                    RecentAssignment.push({
                        assignment: assignment,
                        ClassName: section.name

                    });
                }

            })
        })
        //sort by nearest to todays date
        const today = new Date();
        RecentAssignment.sort((a, b) => {
            const dateA = Math.abs(today.getTime() - new Date(a.assignment.dueDate).getTime());
            const dateB = Math.abs(today.getTime() - new Date(b.assignment.dueDate).getTime());
            return dateA - dateB;
        })
        setRecentAssignment(RecentAssignment);
    }, [data])

    return (
        <div>
            <Card maxW={"500px"}>


                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Recently Added Assignments
                            </Heading>
                            <Box paddingLeft={5}>
                                <Stack spacing={2}>
                                    {RecentAssignment.map((oneAssignment: AssignmentArray) => (
                                        <Assignment section_guid={0} assignment={oneAssignment.assignment} CustomText={oneAssignment.ClassName} />
                                    ))}
                                </Stack>

                            </Box>

                        </Box>


                    </Stack>
                </CardBody>
            </Card>
        </div>
    )
}
export default RecentAssignments;