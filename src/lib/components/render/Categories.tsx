import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import type { AssignmentType } from 'global';
import AppContext from '~/lib/utils/AppContext';

import OneCategory from './OneCategory';

interface CategoriesProps {
  termstart: Date;
  termend: Date;
  section_guid: number;
}

const Categories = (props: CategoriesProps) => {
  const { data } = useContext(AppContext);
  const section = data.data.student.sections.find(
    (section: any) => section.guid === props.section_guid
  );
  const current_assignments: AssignmentType[] = section.assignments.filter(
    (t: any) =>
      new Date(t.dueDate) > props.termstart &&
      new Date(t.dueDate) < props.termend
  );

  const cats: string[] = [
    ...new Set(current_assignments.map((a: any) => a.category)),
  ];

  return (
    <>
      {cats.length !== 0 && (
        <Accordion allowToggle>
          {cats.map((c, index) => (
            <OneCategory
              key={index}
              termstart={props.termstart}
              termend={props.termend}
              section_guid={props.section_guid}
              category={c}
            />
          ))}
        </Accordion>
      )}
    </>
  );
};
export default Categories;
