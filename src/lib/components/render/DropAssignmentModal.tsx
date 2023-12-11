import { MinusIcon } from "@chakra-ui/icons";
import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Center, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import { AssignmentType } from "~/global";

interface DropAssignmentModalProps {
    current_assignments: AssignmentType[];
    section_guid: string;
    category: string;
    SetCurrentAssignments: (assignments: AssignmentType[]) => void;
}
const DropAssignmentModal = (props: DropAssignmentModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numdropped, setNumDropped] = useState<number>(0);
    const dropAssignments = () => {
        //drop lowest numdropped assignments
        // console.log(numdropped);
        let numtodrop = numdropped;
        const new_assignments = props.current_assignments.sort((a, b) => (a.pointsEarned / a.pointsPossible) - (b.pointsEarned / b.pointsPossible)).map((a, index) => {
            if (a.pointsEarned === null || a.attributeExempt || !a.includedInFinalGrade) {
                numtodrop++;
                return {
                    ...a,
                    attributeDropped: false,
                }
            }
            else if (index < numtodrop) {
                return {
                    ...a,
                    attributeDropped: true,
                }
            }
            else {
                return {
                    ...a,
                    attributeDropped: false,
                }
            }
        }
        ).sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? -1 : 1);

        // console.log(new_assignments);

        props.SetCurrentAssignments([...new_assignments]);
        onClose();
    }

    return (
        <div>
            <Button onClick={onOpen}><MinusIcon /></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            Drop Assignments from {props.category} Category
                        </Center>


                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NumberInput onChange={(valueAsString) => { setNumDropped(parseInt(valueAsString)) }}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={dropAssignments}>Drop</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default DropAssignmentModal