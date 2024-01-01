import { Box } from "@chakra-ui/react";
import { BookLoader } from "react-awesome-loaders";

const Loading = () => (
    <>
        <Box position={"fixed"} zIndex={9999} top={"50%"} left={"50%"} transform={"translate(-50%,-50%)"}>
            <BookLoader
                background={"linear-gradient(135deg, #6066FA, #4645F6)"}
                desktopSize={"100px"}
                mobileSize={"80px"}
                textColor={"#4645F6"}
                text={"Loading Grades..."}
            />
        </Box>
    </>
);

export default Loading;
