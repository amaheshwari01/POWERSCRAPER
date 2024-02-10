import { Button, Text, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure, Center, VStack, IconButton, Spacer } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { AssignmentType } from "~/global";
import { calculatePercent, calculateNeccasaryGrade } from "../utils/HelperFunctions";
import { RepeatIcon } from "@chakra-ui/icons";
interface GradeCalculatorProps {
    section: any;
    termstart: Date;
    termend: Date;
    curWeight: any;
    curGrade: number;
}

const GradeCalculator = (props: GradeCalculatorProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { section, termstart, termend, curWeight } = props;
    const current_assignments: AssignmentType[] = section.assignments.filter(
        (t: any) =>
            new Date(t.dueDate) >= termstart &&
            new Date(t.dueDate) <= termend
    );
    const removeDuplicates = (arr: any[]) => {
        return arr.filter((v, i, a) => a.indexOf(v) === i);
    }


    const cats = Object.keys(curWeight)
    const [selectedCat, setSelectedCat] = useState<string>("")
    const [pointspossible, setPointspossible] = useState<number>(0)
    const [pointsearned, setPointsearned] = useState<number>(0)
    const [desiredGrade, setDesiredGrade] = useState<number>(0)
    const [calculatedGrade, setCalculatedGrade] = useState<number>(null)
    const [calculatedPoints, setCalculatedPoints] = useState<number>(null)
    const [reverse, setReverse] = useState<boolean>(false)
    const calculateGrade = () => {
        const new_assignments: AssignmentType[] = [...current_assignments,
        {
            __typename: "GRADE CALCULATOR??",
            guid: "None CUZ WE CALCULATE DIS BOI",
            title: "TEST",
            category: selectedCat,
            description: "Calculated",
            dueDate: termstart.toISOString(),
            scoreLabel: "URMOM",
            pointsEarned: pointsearned,
            pointsPossible: pointspossible,
            teacherComment: "UR MOM",
            attributeMissing: false,
            attributeLate: false,
            attributeCollected: true,
            attributeExempt: false,
            includedInFinalGrade: true,
            attributeIncomplete: false,
            attributeDropped: false,

        }
        ]
        const updatedSection = {
            ...section,
            assignments: new_assignments
        }
        // console.log(updatedSection)
        const grade = calculatePercent(updatedSection, termstart, termend, curWeight)
        setCalculatedGrade(grade)
    }
    useEffect(() => {
        setCalculatedGrade(null)
        setCalculatedPoints(null)
    }, [selectedCat])
    const reverseCalc = () => {

        const calculated = calculateNeccasaryGrade(section, termstart, termend, curWeight, desiredGrade, selectedCat, pointspossible)
        setCalculatedPoints(calculated)
    }


    return (
        <div>
            <Button onClick={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width={"20px"}>
                    <path d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
            </Button>

            <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Grade Calculator
                        <HStack>
                            <HStack>
                                <Text fontSize={"md"}>for {props.section.name}

                                </Text>
                                <Text fontSize={"sm"}>Current Grade: {props.curGrade.toFixed(3)}%</Text>
                            </HStack>
                            <Spacer />
                            <IconButton
                                isRound={true}
                                variant='solid'
                                // colorScheme='teal'
                                aria-label='Done'
                                fontSize='20px'
                                icon={<RepeatIcon />}
                                onClick={() => { setReverse(!reverse) }}

                            />

                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    {reverse ? <ModalBody>
                        <Select onChange={(e) => { setSelectedCat(e.target.value) }} placeholder='Select Category'>
                            {cats.map((cat) => (<option key={cat} value={cat}>{cat + " " + curWeight[cat]}</option>))

                            }
                        </Select>
                        {/* Number to take in points possible and points earned */}
                        <Center>
                            <VStack maxW={"80%"}>
                                <NumberInput onChange={(valueAsString) => { setDesiredGrade(parseFloat(valueAsString)) }}>
                                    <NumberInputField placeholder="Desired %" />

                                </NumberInput>
                                <NumberInput onChange={(valueAsString) => { setPointspossible(parseFloat(valueAsString)) }}>
                                    <NumberInputField placeholder="possible points" />

                                </NumberInput>
                            </VStack>
                        </Center>
                        <Text>Points Needed: {calculatedPoints ? calculatedPoints.toFixed(2) : "N/A"}</Text>
                    </ModalBody> :
                        <ModalBody>
                            <Select onChange={(e) => { setSelectedCat(e.target.value) }} placeholder='Select Category'>
                                {cats.map((cat) => (<option key={cat} value={cat}>{cat + " " + curWeight[cat]}</option>))

                                }
                            </Select>
                            {/* Number to take in points possible and points earned */}
                            <Center>
                                <HStack maxW={"80%"}>
                                    <NumberInput onChange={(valueAsString) => { setPointsearned(parseFloat(valueAsString)) }}>
                                        <NumberInputField placeholder="earned" />

                                    </NumberInput><Text>/</Text>
                                    <NumberInput onChange={(valueAsString) => { setPointspossible(parseFloat(valueAsString)) }}>
                                        <NumberInputField placeholder="possible" />

                                    </NumberInput>
                                </HStack>
                            </Center>
                            <br></br>
                            <Text>Calculated Grade: {calculatedGrade ? calculatedGrade.toFixed(3) + "%" : "N/A"}</Text>
                            <Text>Calulated Grade in Powerschool: {calculatedGrade ? calculatedGrade.toFixed(0) + "%" : "N/A"} </Text>



                        </ModalBody>
                    }

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {reverse ? <Button colorScheme='blue' onClick={reverseCalc}>Calculate!</Button> :
                            <Button colorScheme='blue' onClick={calculateGrade}>Calculate!</Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default GradeCalculator;