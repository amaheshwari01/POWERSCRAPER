import { Text } from '@chakra-ui/react';
import { useContext } from 'react';
import AppContext from '~/lib/utils/AppContext';
const Gpa = () => {
    const { data } = useContext(AppContext);
    return (
        <div>
            {Object.keys(data).length !== 0 &&
                <Text p={2} fontSize={'sm'}>
                    GPA:{data.data.student.currentGPA}
                </Text >
            }
        </div>
    );
}
export default Gpa;