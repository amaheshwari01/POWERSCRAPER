import { Button, Center, Box, HStack, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { AssignmentType } from "~/global";
import Assignment from "./Assignment";
import { useContext, useState } from "react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import AppContext from '~/lib/utils/AppContext';

interface EditAssignmentModalProps {
    Assignment: AssignmentType;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    section_guid: string;
}

export default function EditAssignmentModal(props: EditAssignmentModalProps) {
    const { data, setData, default_data } = useContext(AppContext);
    const { Assignment, isOpen, onClose, onOpen, section_guid } = props;
    const [pointsearned, setPointsearned] = useState<number>(Assignment.pointsEarned);
    const [pointspossible, setPointspossible] = useState<number>(Assignment.pointsPossible);
    const onSave = () => {
        const new_assignments = data.data.student.sections.find(
            (section: any) => section.guid === section_guid
        ).assignments.map((a: any) => {
            if (a.guid === Assignment.guid) {
                return {
                    ...a,
                    pointsEarned: pointsearned,
                    pointsPossible: pointspossible,
                    attributeEdited: true

                }
            }
            return a;
        })
        const new_section = {
            ...data.data.student.sections.find(
                (section: any) => section.guid === section_guid
            ),
            assignments: new_assignments
        }
        const new_data = {
            ...data,
            data: {
                ...data.data,
                student: {
                    ...data.data.student,
                    sections: data.data.student.sections.map((section: any) => {
                        if (section.guid === section_guid) {
                            return new_section;
                        }
                        return section;
                    })
                }
            }
        }
        setData(new_data);
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Center>
                        {Assignment.title}
                    </Center>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                        {Assignment.teacherComment && <Text fontSize="sm" color="gray.800" mb={4}>Teacher comment:{Assignment.teacherComment}</Text>}
                    </Center>
                    <Center>
                        <HStack maxW={"80%"}>
                            <Text>Score:</Text>
                            <NumberInput value={pointsearned} onChange={(valueAsString) => { setPointsearned(parseFloat(valueAsString)) }}>
                                <NumberInputField placeholder="earned" />
                            </NumberInput>
                            <Text>/</Text>
                            <NumberInput value={pointspossible} onChange={(valueAsString) => { setPointspossible(parseFloat(valueAsString)) }}>
                                <NumberInputField placeholder="possible" />
                            </NumberInput>
                        </HStack>
                    </Center>
                </ModalBody>
                <ModalFooter>
                    <Button variant={"blue"} mr={3} onClick={onSave}  >
                        Save
                    </Button>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}