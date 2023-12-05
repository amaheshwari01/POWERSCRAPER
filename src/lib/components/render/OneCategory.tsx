import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import type { AssignmentType } from 'global';
import AppContext from '~/lib/utils/AppContext';

import Assignment from './Assignment';

interface CategoriesProps {
  termstart: Date;
  termend: Date;
  section_guid: number;
  category: string;
}

const Categories = (props: CategoriesProps) => {
  const { data } = useContext(AppContext);
  const section = data.data.student.sections.find(
    (section: any) => section.guid === props.section_guid
  );
  const current_assignments: AssignmentType[] = section.assignments
    .filter(
      (t: any) =>
        new Date(t.dueDate) > props.termstart &&
        new Date(t.dueDate) < props.termend &&
        t.category === props.category
    )
    .sort((a: any, b: any) =>
      new Date(a.dueDate) > new Date(b.dueDate) ? -1 : 1
    );
  const [catGrade, setCatGrade] = useState<number>();
  useEffect(() => {
    let total = 0;
    let total_earned = 0;
    current_assignments.forEach((a: any) => {
      if (a.pointsEarned) {
        total += a.pointsPossible;
        total_earned += a.pointsEarned;
      }
    });
    setCatGrade((total_earned / total) * 100);
  }, [current_assignments]);

  return (
    <AccordionItem key={`${props.section_guid} ${props.category}`}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          {props.category}
        </Box>
        <Box as="span" flex="1">
          Score :{catGrade ? <>{catGrade.toFixed(3)}%</> : 'N/A'}
        </Box>
      </AccordionButton>

      <AccordionPanel pb={4} key={`${props.section_guid} ${props.category}`}>
        {current_assignments.map((a: any, index: number) => (
          <div key={`${a.name} ${index}`}>
            <Assignment CustomText="" assignment={a} section_guid={props.section_guid} />
          </div>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};
export default Categories;
