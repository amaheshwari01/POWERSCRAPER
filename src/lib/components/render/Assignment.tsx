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
} from '@chakra-ui/react';

import type { AssignmentType } from 'global';

interface AssignmentProps {
  assignment: AssignmentType;
  section_guid: number;
}

const Assignment = (props: AssignmentProps) => {
  const { assignment } = props;
  return (
    <Box pl={4} pb={1}>
      <Card boxShadow="xl" variant="filled" maxW="xl">
        <Flex p={3}>
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
          <Text>{assignment.pointsEarned}</Text>/
          <Text>{assignment.pointsPossible}</Text>
        </Flex>

        {/* </HStack> */}
      </Card>
    </Box>
  );
};
export default Assignment;
