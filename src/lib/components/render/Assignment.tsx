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
} from '@chakra-ui/react';

import type { AssignmentType } from 'global';

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
          {/* <Checkbox defaultChecked> */}
          <Text size="md">{assignment.title}</Text>
          {/* </Checkbox> */}
          <>
            {assignment.pointsEarned === null && (
              <Tag size="sm" colorScheme="green" borderRadius="full">
                <TagLabel>Not Entered</TagLabel>
              </Tag>
            )}
            {assignment.attributeMissing && (
              <Tag size="sm" colorScheme="orange" borderRadius="full">
                <TagLabel>Missing</TagLabel>
              </Tag>
            )}

            {assignment.attributeExempt && (
              <Tag size="sm" colorScheme="yellow" borderRadius="full">
                <TagLabel>Exempt</TagLabel>
              </Tag>
            )}
            {assignment.attributeLate && (
              <Tag size="sm" colorScheme="red" borderRadius="full">
                <TagLabel>Late</TagLabel>
              </Tag>

            )}
          </>
          <Spacer />
          {/* <NumberInput maxW={"10"} size={'xs'} defaultValue={isNaN(assignment.pointsEarned) ? 0 : assignment.pointsEarned} >
                            <NumberInputField px={1} py={1} />
                        </NumberInput> */}
          <Text>{((assignment.pointsEarned / assignment.pointsPossible) * 100).toFixed(2)}%  </Text>
          <Spacer></Spacer>
          <Text>{assignment.pointsEarned}</Text>/
          <Text>{assignment.pointsPossible}</Text>
          {/* <br></br> */}


        </Flex>
        <HStack>
          <Text textAlign={"left"} color={"gray"} px='10px' fontSize='xs'>{props.CustomText}</Text>
          <Spacer />
          <Text textAlign={"right"} color={"gray"} px='10px' fontSize='xs'>{formatDate(assignment.dueDate)}</Text>
        </HStack>

        {/* </HStack> */}
      </Card>
    </Box>
  );
};
export default Assignment;
