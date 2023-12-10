import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import weights from '~/weights.json';
import AppContext from '~/lib/utils/AppContext';
import { calculatePercent } from '../gradeCalcuator/calculate';
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
  const termstart = new Date(current_term.start)
  const termend = new Date(current_term.end)
  const curWeight = weights[section.name]

  useEffect(() => {


    setCalculatedGrade(calculatePercent(section, termstart, termend, curWeight))


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
