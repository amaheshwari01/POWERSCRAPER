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

    // If letters are equal, compare by number
    return parseInt(periodA[0]) - parseInt(periodB[0]);

    // I have array of objects and object.period is a string like "1(A)" or "2(B)" or "3(A)" or "4(B)"  and I want ti sort it like 1(A) 2(A) 3(A) 4(A) 1(B) 2(B) 3(B) 4(B)


  });

  return (
    <Accordion allowToggle>
      {sections.map((section: any, index: any) => (
        <OneClass
          key={JSON.stringify(section)}
          term={term}
          section_guid={section.guid}
        />
      ))}
    </Accordion>
  );
};

export default ClassList;
