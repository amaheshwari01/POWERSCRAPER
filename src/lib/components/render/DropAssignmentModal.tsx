import { MinusIcon } from "@chakra-ui/icons";
import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Center, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { AssignmentType } from "~/global";
import AppContext from "~/lib/utils/AppContext";
interface DropAssignmentModalProps {
    current_assignments: AssignmentType[];
    section_guid: string;
    category: string;
    SetCurrentAssignments: (assignments: AssignmentType[]) => void;
}
const DropAssignmentModal = (props: DropAssignmentModalProps) => {
    const { default_data } = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numdropped, setNumDropped] = useState<number>(0);

    const dropAssignments = (numtodrop: number) => {
        //drop lowest numdropped assignments
        // console.log(numdropped);
        // if (numtodrop !== numdropped) {
        //     return;
        // }

        // return;


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


        props.SetCurrentAssignments([...new_assignments]);
        console.log("Dropping " + numtodrop + " assignments from " + props.category + " ")

        localStorage.setItem('drop:' + props.section_guid + ',' + props.category, numtodrop.toString());


        onClose();

    }
    useEffect(() => {

        const num = localStorage.getItem('drop:' + props.section_guid + ',' + props.category);
        if (num && parseInt(num) > 0) {


            // console.log("Found in storage dropping" + num);
            const intnum = parseInt(num)

            console.log("ME DORPPING NOW")
            dropAssignments(intnum)
            setNumDropped(parseInt(num))




        }

        // setHasrun(true);

    }, [default_data])
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
                        <NumberInput min={0} value={numdropped} onChange={(valueAsString) => { setNumDropped(parseInt(valueAsString)) }}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={() => {
                            console.log("droppping" + " " + numdropped)
                            dropAssignments(numdropped)

                        }}>Drop</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default DropAssignmentModal