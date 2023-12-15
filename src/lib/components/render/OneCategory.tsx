import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import DropAssignmentModal from './DropAssignmentModal';
import type { AssignmentType } from 'global';
import AppContext from '~/lib/utils/AppContext';
import { updateData } from '../gradeCalcuator/calculate';
import Assignment from './Assignment';

interface CategoriesProps {
  curterm: string;
  termstart: Date;
  termend: Date;
  section_guid: string;
  category: string;
}


const Categories = (props: CategoriesProps) => {
  const { data, setData, default_data } = useContext(AppContext);
  const section = data.data.student.sections.find(
    (section: any) => section.guid === props.section_guid
  );
  const [current_assignments, setCurrentAssignmets] = useState<AssignmentType[]>(section.assignments
    .filter(
      (t: any) =>
        new Date(t.dueDate) >= props.termstart &&
        new Date(t.dueDate) <= props.termend &&
        t.category === props.category
    ).sort((a: any, b: any) =>
      new Date(a.dueDate) > new Date(b.dueDate) ? -1 : 1
    ))
  const [catGrade, setCatGrade] = useState<number>();
  useEffect(() => {
    let total = 0;
    let total_earned = 0;
    current_assignments.forEach((a: any) => {
      if (a.pointsEarned !== null && !a.attributeExempt && a.includedInFinalGrade && !a.attributeDropped) {
        total += a.pointsPossible;
        total_earned += a.pointsEarned;
      }
    });
    setCatGrade((total_earned / total) * 100);
    const new_data = updateData(data, props.section_guid, props.category, current_assignments)
    setData(new_data)
    // console.log(section.name, new_data["data"]["student"]["sections"])

  }, [current_assignments]);

  return (
    <AccordionItem key={`${props.section_guid} ${props.category}`}>
      <HStack>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {props.category}
          </Box>
          <Box as="span" flex="1">
            Score :{catGrade ? <>{catGrade.toFixed(3)}%</> : 'N/A'}
          </Box>

        </AccordionButton>
        <DropAssignmentModal curTerm={props.curterm} current_assignments={current_assignments} section_guid={props.section_guid} category={props.category} SetCurrentAssignments={setCurrentAssignmets} />
      </HStack>
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
