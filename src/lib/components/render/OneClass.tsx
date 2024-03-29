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
import NoCalc from './noCalc';

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
  const [curWeight, setCurWeight] = useState<any>()



  useEffect(() => {
    try {
      if (curWeight)
        setCalculatedGrade(calculatePercent(section, termstart, termend, curWeight))
    }
    catch (err) {
      console.log(err)
    }

  }, [data]);
  //update weights to firebase
  useEffect(() => {
    if (!curWeight) {
      let savetoFirebase = false
      const grades = sumCategories(section, termstart, termend)

      const userWeights = Object.keys(grades)
      const dataWeights = weights[section.name]
      if (dataWeights) {
        let updatedCurWeight = {}
        const weightkeys = Object.keys(dataWeights)
        weightkeys.forEach((key) => {
          if (key.split(",").length > 1) {
            const keysplit = key.split(",")
            let found = false
            for (let i = 0; i < keysplit.length; i++) {
              if (userWeights.indexOf(keysplit[i]) !== -1) {
                updatedCurWeight[keysplit[i]] = dataWeights[key]
                found = true
                break;
              }
            }
            if (!found) {
              updatedCurWeight[keysplit[0]] = dataWeights[key]
            }

          }
          else {
            updatedCurWeight[key] = dataWeights[key]
          }

        })
        const vals = Object.values(updatedCurWeight)

        const sum = vals.reduce((a: number, b: number) => a + b, 0)
        if (sum === 1) {
          setCurWeight(updatedCurWeight)
        }
        else {
          console.log("Weights do not add up to 1", sum, section.name)
          console.log(updatedCurWeight)
          savetoFirebase = true
        }
      }
      else {
        savetoFirebase = true
      }
      if (savetoFirebase) {
        const weightref = ref(database, 'userWeights/' + section.name)
        get(weightref).then((snapshot) => {
          const currentData = snapshot.val();
          // console.log(currentData)
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



    }

  }, [])

  const hidden = ["Open Period", "Chapel"]
  return (
    <>
      {(weights && hidden.indexOf(section.name) == -1) && (
        <AccordionItem key={section.name}>
          <HStack>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {section.name}
              </Box>

              <Box as="span" flex="1">
                Grade :{' '}
                {calualtedGrade ? calualtedGrade.toFixed(2) + "%"
                  : (current_term.finalGrade ? current_term.finalGrade.percent + "%" : "N/A")}
              </Box>

            </AccordionButton>

            {/* {(!calualtedGrade && !current_term.finalGrade) && <Box as="span" width="60px" >
            </Box>}
            {(!calualtedGrade) && <NoCalc />} */}
            {calualtedGrade ? <GradeCalculator
              curGrade={calualtedGrade}
              section={section}
              termstart={termstart}
              termend={termend}
              curWeight={curWeight}
            />
              : (current_term.finalGrade ? <NoCalc /> : (current_term.sendingGrades ? <Box as="span" width="60px" >
              </Box> : <NoCalc />))}



          </HStack >
          {
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
