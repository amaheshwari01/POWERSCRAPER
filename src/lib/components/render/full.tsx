import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Card, Link } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useColorModeValue } from "@chakra-ui/react";

import AppContext from '~/lib/utils/AppContext';
import RecentAssignments from './RecentAssignments';

import ClassList from './classlist';

const FullRender = () => {
  const { data } = useContext(AppContext);
  const terms = data.data.student.schools[0].schedulingTerms.map(
    (term: any) => term.abbreviation
  );

  return (
    <>

      <Text p={2} fontSize={"sm"}>Last Updated:{localStorage.getItem("dateUpdated")}</Text>
      <Card p={2} fontSize={'sm'}>
        This is a beta version of the app. I do not have weights for all the classes, If you find any innacuracies or want me to add your class please send your syllabus to me at <Link color={"blue"} href="mailto:syllabus@aayanmaheshwari.com">syllabus@aayanmaheshwari.com</Link>


      </Card>
      <Tabs pt={2} variant="enclosed" defaultIndex={1} isLazy>
        <TabList>
          {terms.map((term: string) => (
            <Tab key={term}>{term}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {terms.map((term: string) => (
            <TabPanel key={`1${term}`}>
              <ClassList term={term} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <RecentAssignments />
    </>
  );
};

export default FullRender;
