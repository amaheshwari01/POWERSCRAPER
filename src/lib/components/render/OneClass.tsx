import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import weights from '~/weights.json';
import AppContext from '~/lib/utils/AppContext';

import Categories from './Categories';
import { AssignmentType } from '~/global';

interface OneClassProps {
  term: string;
  section_guid: string;
}
const OneClass = (props: OneClassProps) => {
  const { data, default_data } = useContext(AppContext);
  //Calcualte grade based on weights.json
  const [calualtedGrade, setCalculatedGrade] = useState<number>();



  const section = data.data.student.sections.find(
    (section: any) => section.guid === props.section_guid
  );
  const current_term = section.terms.filter(
    (t: any) => t.label === props.term
  )[0];
  //Calculate weighted grade WILDLY INEFFICENT BUT WORKS!!
  useEffect(() => {

    const section = data.data.student.sections.find(
      (section: any) => section.guid === props.section_guid
    );
    const curWeight = weights[section.name]
    const current_term = section.terms.filter(
      (t: any) => t.label === props.term
    )[0];
    const termstart = new Date(current_term.start)
    const termend = new Date(current_term.end)
    const current_assignments: AssignmentType[] = section.assignments.filter(
      (t: any) =>
        new Date(t.dueDate) > termstart &&
        new Date(t.dueDate) < termend
    );
    const cats: string[] = [
      ...new Set(current_assignments.map((a: any) => a.category)),
    ];
    let grades = {}
    cats.forEach((cat) => {
      grades[cat] = {
        total: 0,
        earned: 0,
      };
    });
    current_assignments.forEach((a: AssignmentType) => {
      if (a.pointsEarned !== null && !a.attributeExempt && a.includedInFinalGrade && !a.attributeDropped) {
        grades[a.category].total += a.pointsPossible;
        grades[a.category].earned += a.pointsEarned;

      }
    });
    console.log(section.name, grades)
    // console.log(grades)
    let toatlweight = 0
    let curpercent = 0
    Object.keys(grades).forEach((grade) => {


      toatlweight += curWeight[grade]
      curpercent += (grades[grade].earned / grades[grade].total) * curWeight[grade]

    })
    curpercent *= (1 / toatlweight)
    setCalculatedGrade(curpercent * 100)


    // toatlweight += weights[grade]



  }, [data]);

  return (
    <>
      {current_term.finalGrade && (
        <AccordionItem key={section.name}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {section.name}
            </Box>

            <Box as="span" flex="1">
              Grade :{' '}
              {current_term.finalGrade && calualtedGrade ? (
                <>
                  {current_term.finalGrade.grade}{' '}
                  {/* {current_term.finalGrade.percent}{' '} */}


                  {calualtedGrade.toFixed(2)}%
                </>
              ) : (
                <>
                  {current_term.finalGrade ? (
                    <>
                      {current_term.finalGrade.grade}{' '}
                      {current_term.finalGrade.percent}{' '}
                    </>
                  ) : (
                    <>N/A</>
                  )}
                </>
              )}
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Categories
              termstart={new Date(current_term.start)}
              termend={new Date(current_term.end)}
              section_guid={props.section_guid}
            />
          </AccordionPanel>
        </AccordionItem>
      )}
    </>
  );
};
export default OneClass;
