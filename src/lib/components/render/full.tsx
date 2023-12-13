import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Card, Link, Button } from '@chakra-ui/react';
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
      <Button as='a' href='https://github.com/amaheshwari01/Power-Assist/blob/main/UsageGuide.md' colorScheme="blue" variant="outline" size="sm" m={2}>Issues/Usage Guide CLICK HERE!!</Button>
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
