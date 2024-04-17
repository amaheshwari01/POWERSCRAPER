import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import DropAssignmentModal from './DropAssignmentModal';
import type { AssignmentType } from 'global';
import AppContext from '~/lib/utils/AppContext';
import { updateData } from '../utils/HelperFunctions';
import Assignment from './Assignment';
import EditAssignmentModal from './EditAssignmentModal';

interface CategoriesProps {
  curterm: string;
  termstart: Date;
  termend: Date;
  section_guid: string;
  category: string;
}


const Categories = (props: CategoriesProps) => {
  const { data, setData, default_data } = useContext(AppContext);
  const [curAssignment, setCurAssignment] = useState<AssignmentType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (curAssignment) {
      onOpen();
    }
  }, [curAssignment]);
  const closeAssignment = () => {
    setCurAssignment(null);
    onClose();
  }
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

  // update overall data when current_assignments changes by the drop assignmets modal
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
    <>
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
              <Assignment setCurAssignment={setCurAssignment} CustomText={a.teacherComment ? '"' + a.teacherComment + '"' : ""} assignment={a} section_guid={props.section_guid} />
            </div>
          ))}
        </AccordionPanel>
      </AccordionItem>
      {curAssignment && <EditAssignmentModal isOpen={isOpen} onOpen={onOpen} onClose={closeAssignment} Assignment={curAssignment} section_guid={props.section_guid} />}
    </>
  );
};
export default Categories;
