import { Card, Box, useColorModeValue, CardBody, Text, Step, Stepper, StepTitle, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, useSteps, Progress, Button, Center, AbsoluteCenter, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { schedScraper } from "../utils/scrape";
import AppContext from "~/lib/utils/AppContext";
import { steps } from "framer-motion";
import { ScheduleData } from "~/global";
import { set } from "firebase/database";
import { ArrowBackIcon, ArrowForwardIcon, RepeatClockIcon } from "@chakra-ui/icons";

const Schedule = () => {
    const [schedule, setSchedule] = useState<ScheduleData[]>([]);
    const [curday, setCurday] = useState<number>()//useState<number>(new Date().getDay() > 0 && new Date().getDay() < 6 ? new Date().getDay() : 1);
    const [todate, setTodate] = useState<number>()
    const [alldays, setAlldays] = useState<number[]>([])
    const { refresh_token, default_data } = useContext(AppContext);
    useEffect(() => {
        //fetch schedule
        schedfecth()
    }, [])

    const schedfecth = async () => {
        const oldSched = localStorage.getItem("sched")
        // oldSched
        if (oldSched) {
            setSchedule(JSON.parse(oldSched).map
                ((item: any) => {
                    return {
                        name: item.name,
                        start: new Date(item.start),
                        stop: new Date(item.stop)
                    }
                }))
        }
        console.log(default_data)
        const sched = await schedScraper(refresh_token, default_data.data.student.sections)

        // setSchedule(sched)
        if (JSON.stringify(sched) !== JSON.stringify(schedule))
            setSchedule(sched)


        // console.log(sched)
    }

    useEffect(() => {
        // console.log(schedule)
        const days = [...new Set(schedule.map((item) => item.start.getDay()))]
        // console.log(days)
        //remove duplicates
        setAlldays(days)
        // const 
        let closestDay = 0
        const todyaday = new Date().getDay()
        // console.log(todyaday)
        for (let i = 0; i < days.length; i++) {
            //find cl
            if ((Math.abs(todyaday - days[i]) < Math.abs(todyaday - days[closestDay]))) {
                closestDay = i
            }
        }
        // console.log(alldays, closestDay, alldays[closestDay])
        setCurday(closestDay)
        setTodate((days[curday] === new Date().getDay()) ? curday : -1)

        // setCurday(new Date().getDay() > 0 && new Date().getDay() < 6 ? new Date().getDay() : 1)




    }
        , [schedule])


    return (
        <Box p={2}>
            <Card minHeight={"400px"} bg={useColorModeValue('white', 'gray.800')} border={"1px"} borderColor={useColorModeValue("gray.100", "gray.600")} maxW={"500px"}>
                <CardBody>
                    {/* <Button onClick={() => { setCurday(curday - 1) }}>Refresh</Button> */}
                    <Flex>
                        <Text>{schedule.filter((item) => item.start.getDay() === alldays[curday]).length !== 0 && schedule.filter((item) => item.start.getDay() === alldays[curday])[0].start.toDateString()}</Text>
                        <Spacer></Spacer>
                        {(todate !== -1 && curday !== todate) && <IconButton variant={"ghost"} colorScheme={"purple"} icon={<RepeatClockIcon bgSize={"10px"} />}
                            onClick={() => { setCurday(todate) }}
                            aria-label="back To Today" />
                        }
                        <IconButton variant={"ghost"} colorScheme={"purple"} icon={<ArrowBackIcon bgSize={"10px"} />}
                            onClick={() => { setCurday(curday - 1) }}
                            isDisabled={curday === 0} aria-label="backward" />

                        <IconButton onClick={() => { setCurday(curday + 1) }}
                            variant={"ghost"} colorScheme={"purple"} icon={<ArrowForwardIcon />} isDisabled={curday === alldays.length - 1} aria-label="forward" />
                    </Flex>
                    {schedule.filter((item) => item.start.getDay() === alldays[curday]).length !== 0 ?
                        <ScheduleSteps key={curday} scheduleData={schedule.filter((item) => item.start.getDay() === alldays[curday])} /> :
                        <AbsoluteCenter >{"No Classes This Week :)"}</AbsoluteCenter>}
                </CardBody>
            </Card>
        </Box>
    )
}
interface ScheduleStepsProps {
    scheduleData: ScheduleData[];
}
const ScheduleSteps = (props: ScheduleStepsProps) => {
    const { scheduleData } = props;
    const [completeClass, setCompleteClass] = useState(-1)
    const [updateTime, setUpdateTime] = useState(Math.random())

    const colormode = useColorModeValue("#805AD5", "#D6BCFA")
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: scheduleData.length,
    })
    const updateStep = () => {

        //setactive setp based on current time
        //today at 12:15 PM
        const now = new Date();
        // console.log(scheduleData)

        const nextclass = scheduleData.findIndex((item) => item.start > now);
        // console.log(scheduleData)
        if (nextclass !== -1) {

            //check if class is over
            (activeStep !== (nextclass - 1)) && setActiveStep(nextclass - 1);
            if (scheduleData[nextclass - 1] && scheduleData[nextclass - 1].stop > now) {
                (completeClass !== -1 && setCompleteClass(-1))

            }
            else {
                (completeClass !== nextclass - 1 && setCompleteClass(nextclass - 1))
            }
        }
        else {
            setActiveStep(scheduleData.length)
        }
        setUpdateTime(Math.random())
    }
    useEffect(() => {
        updateStep()
        const intervalId = setInterval(updateStep, 1000);//sets up interval when component mounts
        return () => clearInterval(intervalId);//clears interval when component unmounts
    }, []);



    return (

        <Stepper key={completeClass} index={activeStep} orientation='vertical' colorScheme={"purple"} height='400px' gap='0'>
            {scheduleData.map((oneClass: ScheduleData, index) => (
                <Step key={index} >
                    {/* {{}} */}

                    <StepIndicator bg={index === completeClass ? colormode : ""}>
                        <StepStatus />

                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{oneClass.name}</StepTitle>
                        <StepDescription as={"div"}>
                            {oneClass.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - {oneClass.stop.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                            <br />
                            {<RealtiveTime update={updateTime} sdate={oneClass.start} edate={oneClass.stop} />}

                        </StepDescription>
                    </Box>

                    {/* <Box bg="red.200"> */}
                    <StepSeparator />
                    {/* </Box> */}
                </Step>
            ))}
        </Stepper>

    );
};
// export default
// export function 
const RealtiveTime = (props: { sdate: Date, edate: Date, update: number }) => {
    const { sdate, edate, update } = props;
    const [reltime, setReltime] = useState(getRelativeTimeString(sdate, edate));
    useEffect(() => {
        setReltime(getRelativeTimeString(sdate, edate))
    }, [update])
    // const [reltime, setReltime] = useState("");
    // setTimeout(() => {
    //     setReltime(getRelativeTimeString(sdate, edate))
    // }, 1000)
    return <>
        <Text fontSize={"xs"}>{reltime}
        </Text></>;


}

export function getRelativeTimeString(
    sdate: Date,
    edate: Date,
): string {
    // Allow dates or times to be passed
    let timeMs = sdate.getTime();
    const now = Date.now();
    let isInPast = timeMs < now;
    let inclass = false;
    if (isInPast) {
        timeMs = edate.getTime();
        inclass = timeMs > now;

    }
    isInPast = timeMs < now;



    // Calculate the time difference in milliseconds
    const deltaMilliseconds = Math.abs(now - timeMs);

    // Get seconds, minutes, and hours from deltaMilliseconds
    let seconds = Math.floor(deltaMilliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    // Extract remaining seconds and minutes after hours calculation
    seconds = seconds % 60;
    minutes = minutes % 60;

    // Return the array with [ss,mm,hh]
    let result = '';
    if (hours >= 12) {
        if (minutes < 30) result = `${hours} hours`
        else result = `${hours + 1} hours`
    }
    else if (hours > 0) {
        if (seconds < 30) result = `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${minutes === 1 ? "minute" : "minutes"
            } `;
        else result = `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes + 1} minutes`;
    }
    else if (minutes > 0) {
        result = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ${seconds} ${seconds === 1 ? "second" : "seconds"} `;
    }
    else {
        result = `${seconds} ${seconds === 1 ? "second" : "seconds"} `;
    }



    if (result.length !== 0) {
        if (isInPast) {
            result += " ago";
        } else {
            if (!inclass)
                result = "in " + result;
            else
                result += " left";
        }
    }

    return result;
}


export default Schedule;