import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import AppContext from "~/lib/utils/AppContext";
import { dropfromRefresh } from "./HelperFunctions";
import { scrape } from "./scrape";
import dirtyFix from "./dirtyphysicsfix";

export default function Scraper() {

    const { refresh_token, setLoading, setDefault_data, setData, setRefreshToken, runFetch, setWeights } = useContext(AppContext);
    const toast = useToast();
    const scrapeData = async (refkey: string) => {
        setLoading(true);

        if (refkey) {
            toast.closeAll()

            scrape(refkey, setWeights, toast)
                .then(handleData).then(() => {
                    setLoading(false);
                    toast.closeAll()
                    toast({
                        title: 'Grades updated',
                        status: 'success',
                        duration: 5000,
                        isClosable: false,
                    });
                })
                .catch((err) => {
                    let errorMessage = err.message;
                    if (axios.isAxiosError(err)) {
                        if (err.response) {
                            // The request was made and the server responded with a status code that falls out of the range of 2xx
                            const statusCode = err.response.status;
                            if (statusCode === 404) {
                                errorMessage =
                                    'The requested resource does not exist or has been deleted';
                            } else if (statusCode === 401) {
                                errorMessage = 'Please login to access this resource';
                            }
                            else if (statusCode === 400) {
                                errorMessage = 'Invalid token';
                                localStorage.removeItem('refresh_token');
                                for (let i = 0; i < localStorage.length; i++) {
                                    let key = localStorage.key(i);
                                    if (key.startsWith('drop:')) {
                                        localStorage.removeItem(key);
                                    }
                                }
                                setRefreshToken('');

                                // setRefreshToken('')
                                // window.location.reload()
                            }
                        } else if (err.request) {
                            // The request was made but no response was received
                            errorMessage = 'No response received please check your WIFI Connection';
                        }
                    }

                    // alert(`Invalid refresh token` + ` ${errorMessage}`);


                    // onOpen();
                    toast.closeAll()

                    toast({
                        title: 'Error Getting Grades',
                        description: errorMessage,
                        status: 'error',
                        duration: null,
                        isClosable: false,
                    });
                    setLoading(false);
                });
        }
    };
    const handleData = async (fetchData: any) => {
        // console.log("plaindata", plaindata)
        const plaindata = checkForUpdates(fetchData)


        const data = dirtyFix(plaindata);

        await setDefault_data(data);
        const gradesToDrop = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith('drop:')) {
                gradesToDrop.push({
                    key,
                    value: localStorage.getItem(key),
                });
            }
        }
        let newData = data;
        // console.log(gradesToDrop)
        gradesToDrop.forEach((value) => {
            // console.log(value)
            const section_guid = value.key.split(':')[1].split('|')[0];
            // console.log(section_guid)
            const category = value.key.split('|')[1];
            const term = value.key.split('|')[2];
            // console.log(term)
            const numtodrop = parseInt(value.value);
            if (numtodrop > 0) {
                newData = dropfromRefresh(
                    section_guid,
                    category,
                    newData,
                    numtodrop,
                    term
                );
            }
        });

        await setData(newData);
        localStorage.setItem('data', JSON.stringify(newData));

        toast.closeAll()


        console.log(data);
        // 
    }
    const checkForUpdates = (data: any) => {
        let new_assignments = []

        if (localStorage.getItem("data")) {
            const lastData = JSON.parse(localStorage.getItem("data"));
            const oldAssignments = getAssignmentArray(lastData);
            new_assignments = getAssignmentArray(data).filter((newAssignment: any) => {
                return !oldAssignments.some((oldAssignment: any) => {
                    return newAssignment.guid === oldAssignment.guid &&
                        newAssignment.dueDate === oldAssignment.dueDate &&
                        newAssignment.pointsPossible === oldAssignment.pointsPossible &&
                        newAssignment.pointsEarned === oldAssignment.pointsEarned
                })
            }).map((assignment: any) => (assignment.guid))

            console.log(new_assignments)


        }
        else {
            new_assignments = getAssignmentArray(data).map((assignment: any) => (assignment.guid))
            console.log(new_assignments)

        }

        localStorage.setItem("new|new_assignments", JSON.stringify(new_assignments))
        return data;

    }
    const getAssignmentArray = (data: any) => {
        let assignments = [];
        try {
            const sections = data.student.sections;
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].assignments) {
                    assignments = [...assignments, ...sections[i].assignments];
                }
            }
        }
        catch (error) {
            console.log(error)
        }
        return assignments;
    }

    useEffect(() => {
        // console.log(refkey);
        if (refresh_token !== '') {
            scrapeData(refresh_token);
        }
    }, [runFetch, refresh_token]);
    useEffect(() => {
        const curdata = JSON.parse(localStorage.getItem('data'))
        const curWeights = JSON.parse(localStorage.getItem('weights'))
        if (curdata && curWeights) {
            handleData(curdata)
            setWeights(curWeights)

        }
    }, [])
    return <>    </>
}