import {
  Card,
  Flex,
  Checkbox,
  Tag,
  Box,
  Text,
  TagLabel,
  Spacer,
  NumberInput,
  NumberInputField,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  VStack,
  Center,
} from '@chakra-ui/react';

import type { AssignmentType } from 'global';
import { useEffect } from 'react';

interface AssignmentProps {
  assignment: AssignmentType;
  section_guid: string;
  CustomText: string;
}

const Assignment = (props: AssignmentProps) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }


  const { assignment } = props;
  return (
    <Box pl={4} pb={1}>
      <Card boxShadow="xl" variant="filled" maxW="xl">
        <Flex px={3} pt={3}>

          <VStack alignItems={"left"} spacing={0}
          >

            <Text color={"gray"} fontSize='xs'>Due: {formatDate(assignment.dueDate)}</Text>

            <Text size="md">{assignment.title}</Text>


            <Text color={"gray"} fontSize='xs'>{props.CustomText}</Text>

            <Tags assignment={assignment} />
          </VStack>

          <Spacer />
          <VStack>

            {/* <CircularProgress value={((assignment.pointsEarned / assignment.pointsPossible) * 100)} color='blue.400' >
              <CircularProgressLabel>{((assignment.pointsEarned / assignment.pointsPossible) * 100).toFixed(0)}%</CircularProgressLabel>
            </CircularProgress> */}
            {assignment.pointsEarned !== null ?
              <>
                <Text>{((assignment.pointsEarned / assignment.pointsPossible) * 100).toFixed(1)}%</Text>
                <Text color={"gray"} fontSize='xs'>{assignment.pointsEarned}/{assignment.pointsPossible}</Text>
              </>
              :
              <>
                <Text></Text><Text></Text>

                <Text > / {assignment.pointsPossible}</Text>
              </>
            }
          </VStack>
          {/* <br></br> */}


        </Flex>


        {/* </HStack> */}
      </Card>
    </Box>
  );
};
interface TagProps {
  assignment: AssignmentType;
}
const Tags = (props: TagProps) => {
  const { assignment } = props;
  return (
    <>
      {(assignment.pointsEarned === null) && (
        <SingleTag title="Not Entered" color="green" />

      )}
      {assignment.attributeMissing && (
        <SingleTag title="Missing" color="orange" />

      )}

      {(assignment.attributeExempt || !assignment.includedInFinalGrade) && (
        <SingleTag title="Exempt" color="yellow" />

      )}
      {assignment.attributeLate && (

        <SingleTag title="Late" color="red" />


      )}
      {assignment.attributeDropped && (
        <SingleTag title="Dropped" color="purple" />
      )}
    </>
  )
}
interface singleTagProps {
  title: string;
  color: string;
}
const SingleTag = (props: singleTagProps) => {
  const { title, color } = props;
  return (
    <Box p={.1}>
      <Tag size="sm" colorScheme={color} borderRadius="full">
        <TagLabel>{title}</TagLabel>
      </Tag>
    </Box>
  )
}

export default Assignment;
