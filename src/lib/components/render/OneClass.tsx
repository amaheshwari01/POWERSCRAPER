import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import AppContext from '~/lib/utils/AppContext';
import { calculatePercent, sumCategories } from '../utils/HelperFunctions';
import Categories from './Categories';
import GradeCalculator from '../gradeCalcuator/gradeCalculator';
import { database } from '../utils/firebase';
import { ref, get, set } from 'firebase/database';

interface OneClassProps {
  term: string;
  section_guid: string;
}
const OneClass = (props: OneClassProps) => {
  const { data, default_data, weights } = useContext(AppContext);
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
    if (current_term.finalGrade) {
      setCalculatedGrade(calculatePercent(section, termstart, termend, curWeight))
    }

  }, [data]);
  useEffect(() => {
    if (!curWeight) {
      const grades = sumCategories(section, termstart, termend)

      const userWeights = Object.keys(grades)
      const weightref = ref(database, 'userWeights/' + section.name)
      get(weightref).then((snapshot) => {
        const currentData = snapshot.val();
        console.log(currentData)
        let combinedArray = []
        // Convert arrays to sets to remove duplicates
        if (!currentData) {
          combinedArray = userWeights
        }
        else {
          const combinedSet = new Set([...currentData, ...userWeights]);

          // Convert set back to array
          combinedArray = Array.from(combinedSet);
        }

        // Update Firebase with the combined array
        set(weightref, combinedArray)
          .then(() => {
            console.log('Update succeeded');
          })
          .catch((error) => {
            console.log('Update failed:', error);
          });
      }).catch((error) => {
        console.log('Failed to read data:', error);
      });
    }
  }, [])

  const hidden = ["Open Period", "Chapel"]
  return (
    <>
      {(current_term.sendingGrades && weights && hidden.indexOf(section.name) == -1) && (
        <AccordionItem key={section.name}>
          <HStack>
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
            {calualtedGrade && <GradeCalculator
              curGrade={calualtedGrade}
              section={section}
              termstart={termstart}
              termend={termend}
              curWeight={curWeight}
            />
            }
            {!calualtedGrade && <Box as="span" width="60px" >
            </Box>}

          </HStack >
          {current_term.finalGrade &&
            <AccordionPanel pb={4}>
              <Categories
                curTerm={props.term}
                termstart={new Date(current_term.start)}
                termend={new Date(current_term.end)}
                section_guid={props.section_guid}
              />
            </AccordionPanel>
          }
        </AccordionItem >
      )}
    </>
  );
};
export default OneClass;
