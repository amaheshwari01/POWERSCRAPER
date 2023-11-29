import { AccordionButton, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "~/lib/utils/AppContext"


interface OneClassProps {
    term: string,
    section_guid: number,

}
const OneClass = (props: OneClassProps) => {
    const { data } = useContext(AppContext);
    const section = data.data.student.sections.find((section: any) => (
        section.guid === props.section_guid
    ))
    const current_term = section.terms.filter((t: any) => (t.label === props.term))[0]
    return (

        <>
            {current_term.finalGrade &&
                <AccordionItem key={section.name}>

                    <AccordionButton >


                        <Box as="span" flex='1' textAlign='left'>
                            {section.name}
                        </Box>

                        <Box as="span" flex='1' >

                            Grade : {current_term.finalGrade ? <>{current_term.finalGrade.grade} {current_term.finalGrade.percent}</> : "N/A"}
                        </Box>

                    </AccordionButton>
                    <AccordionPanel pb={4}>

                    </AccordionPanel>
                </AccordionItem>
            }
        </>
    );
}
export default OneClass;