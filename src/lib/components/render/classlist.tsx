import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import AppContext from '~/lib/utils/AppContext';

import OneClass from './OneClass';
import RecentAssignments from './RecentAssignments';

interface ClassListProps {
  term: string;
}
const ClassList = (props: ClassListProps) => {
  const { data } = useContext(AppContext);
  const { term } = props;
  const sections = data.data.student.sections.filter(
    (section: any) =>
      section.terms.filter((t: any) => t.label === term).length !== 0
  ).sort((a: any, b: any) => {
    let periodA = a.period.split("(");
    let periodB = b.period.split("(");

    // Compare by letter first
    if (periodA[1] < periodB[1]) {
      return -1;
    }
    if (periodA[1] > periodB[1]) {
      return 1;
    }

    return parseInt(periodA[0]) - parseInt(periodB[0]);



  })
  useEffect(() => {
    let aday = []
    let bday = []
    sections.forEach((section: any) => {
      if (section.period.includes("A")) {
        aday.push(section.name)
      }
      else {
        bday.push(section.name)
      }
    })
    localStorage.setItem("aday", JSON.stringify(aday))
    localStorage.setItem("bday", JSON.stringify(bday))

  }, [sections]);

  return (
    <>
      <Accordion allowToggle>
        {sections.map((section: any, index: any) => (
          <OneClass
            key={JSON.stringify(section)}
            term={term}
            section_guid={section.guid}
          />
        ))}
      </Accordion>

    </>
  );
};

export default ClassList;
