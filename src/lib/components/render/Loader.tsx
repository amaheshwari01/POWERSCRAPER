import { BookLoader } from "react-awesome-loaders";

const Loading = () => (
    <>
        <BookLoader
            background={"linear-gradient(135deg, #6066FA, #4645F6)"}
            desktopSize={"100px"}
            mobileSize={"80px"}
            textColor={"#4645F6"}
            text={"Loading Grades..."}
        />
    </>
);

export default Loading;
