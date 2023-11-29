import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { AssignmentType } from "global";
import { useContext, useEffect, useState } from "react";
import AppContext from "~/lib/utils/AppContext"
import Assignment from "./Assignment";


interface CategoriesProps {
    termstart: Date,
    termend: Date,
    section_guid: number,
    category: string
}

const Categories = (props: CategoriesProps) => {
    const { data } = useContext(AppContext);
    const section = data.data.student.sections.find((section: any) => (
        section.guid === props.section_guid
    ))
    const current_assignments: AssignmentType[] = section.assignments.filter((t: any) => (new Date(t.dueDate) > props.termstart && new Date(t.dueDate) < props.termend && t.category === props.category))
    const [catGrade, setCatGrade] = useState<number>();
    useEffect(() => {
        let total = 0;
        let total_earned = 0;
        current_assignments.forEach((a: any) => {
            if ((a.pointsEarned)) {
                total += a.pointsPossible;
                total_earned += a.pointsEarned;
            }
            else {
                console.log(a)
            }
            // console.log(a.pointsEarned)
        })
        setCatGrade((total_earned / total) * 100)

    }, [current_assignments])



    return (

        <>

            <AccordionItem >


                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        {props.category}
                    </Box>
                    <Box as="span" flex='1' >

                        Score :{catGrade ? <>{catGrade.toFixed(3)}%</> : "N/A"}
                    </Box>

                </AccordionButton>

                <AccordionPanel pb={4}>
                    {current_assignments.map((a: any) => (
                        <Assignment key={a.name} assignment={a} section_guid={props.section_guid} />
                    ))}

                </AccordionPanel>

            </AccordionItem>

        </>
    );
}
export default Categories;