import { drop } from "../utils/HelperFunctions";
import { MinusIcon } from "@chakra-ui/icons";
import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Center, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { AssignmentType } from "~/global";
interface DropAssignmentModalProps {
    current_assignments: AssignmentType[];
    section_guid: string;
    category: string;
    SetCurrentAssignments: (assignments: AssignmentType[]) => void;
    curTerm: string;
}
const DropAssignmentModal = (props: DropAssignmentModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numdropped, setNumDropped] = useState<number>(0);

    const dropAssignments = (numtodrop: number) => {
        // setNumDropped(numtodrop)

        const new_assignments = drop(numtodrop, props.current_assignments, props.section_guid, props.category, props.curTerm)
        props.SetCurrentAssignments(new_assignments);
        onClose()


    }
    useEffect(() => {
        const num = localStorage.getItem('drop:' + props.section_guid + '|' + props.category + '|' + props.curTerm);
        if (num && parseInt(num) > 0) {


            // // console.log("Found in storage dropping" + num);
            // const intnum = parseInt(num)

            // dropAssignments(intnum, "useEffect")
            setNumDropped(parseInt(num))





        }


    }, [])

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
                        {/* {numdropped} */}
                        <NumberInput min={0} value={numdropped} onChange={(valueAsString) => {
                            setNumDropped(parseInt(valueAsString))
                        }}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={() => {
                            // console.log(numdropped)
                            onClose()
                        }}>
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