import {
    Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import AppContext from "~/lib/utils/AppContext";
import ClassList from "./classlist";
const FullRender = () => {
    const { data } = useContext(AppContext);
    const terms = data.data.student.schools[0].schedulingTerms.map((term: any) => (
        term.abbreviation))


    return (
        <>

            <Tabs pt={2} variant='enclosed' defaultIndex={1} isLazy>

                <TabList>

                    {terms.map((term: string) => (
                        <Tab key={term}>{term}</Tab>


                    ))}
                </TabList>
                <TabPanels>
                    {terms.map((term: string) => (
                        <TabPanel key={"1" + term}>
                            <ClassList term={term} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>



        </>

    );
}

export default FullRender;
