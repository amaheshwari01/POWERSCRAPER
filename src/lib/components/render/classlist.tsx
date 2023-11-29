import { Accordion, AccordionItem, AccordionButton, Box, AccordionPanel } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import AppContext from "~/lib/utils/AppContext";
import OneClass from "./class";
interface ClassListProps {
    term: string
}
const ClassList = (props: ClassListProps) => {

    const { data } = useContext(AppContext);
    const term = props.term;
    const sections = data.data.student.sections.filter((section: any) => (
        section.terms.filter((t: any) => (t.label === term)).length !== 0)
    )
    useEffect(() => {
        console.log(sections)
    }, [sections])
    return (

        <Accordion allowToggle >
            {sections.map((section: any, index: any) => (

                <OneClass key={JSON.stringify(section)} term={term} section_guid={section.guid} />


            ))}

        </Accordion>
    );
}

export default ClassList;
