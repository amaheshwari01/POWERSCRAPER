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
      {/* Make color of carde change based on colormode */}
      <Card p={2} maxW={"300px"} fontSize={'sm'}>
        There Is a beta version of this app that is testing grade calcualtions. If you would like to try it out, please visit <Link color={"blue"} href="https://powerdev.aayanmaheshwari.com/">powerdev.aayanmaheshwari.com</Link>

      </Card>
      <Text p={2} fontSize={"sm"}>Last Updated:{localStorage.getItem("dateUpdated")}</Text>

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
