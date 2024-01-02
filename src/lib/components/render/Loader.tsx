import { Box } from "@chakra-ui/react";
// import { BookLoader } from "react-awesome-loaders";
import BookLoader from "./Loaders/BookLoader";

const Loading = () => (
    <>
        <Box position={"fixed"} zIndex={-100} top={"50%"} left={"50%"} transform={"translate(-50%,-50%)"}>
            <BookLoader
            // background={"linear-gradient(135deg, #6066FA, #4645F6)"}
            // desktopSize={"100px"}
            // mobileSize={"80px"}
            // textColor={"#4645F6"}
            // text={"Loading Grades..."}
            />
        </Box>
    </>
);

export default Loading;
