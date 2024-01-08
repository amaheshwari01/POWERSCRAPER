import { QuestionIcon } from "@chakra-ui/icons";
import { Button, IconButton, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

export default function NoCalc() {
    const { onOpen, onClose, isOpen } = useDisclosure()
    return (
        <>
            <IconButton
                icon={<QuestionIcon />}
                aria-label="No Calculator"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Grade Calculator is Unavailable</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Unfortunately I do not have the indivdual category weightings for all the classes so I cannot calculate your grade.<br /> If you would like me to calculate your grade, please email me your syllabus at  <Link color='blue' href="mailto:syllabus@aayanmaheshwari.com"> syllabus@aayanmaheshwari.com</Link> or any other means you have of contacting me!

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}