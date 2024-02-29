import { Button, Stack } from "@chakra-ui/react";
import Schedule from "./schedule";
import RecentAssignments from "./RecentAssignments";

export default function Dashboard() {
    return (
        <div>
            <Stack px={4} direction='row' spacing={4}>

                <Button as="a" href="/grades" colorScheme={"purple"}>Grades</Button>
                <Button as="a" href="/moodle" colorScheme={"orange"}>Moodle</Button>
            </Stack>
            <Schedule />
            <RecentAssignments />

        </div>
    );
}