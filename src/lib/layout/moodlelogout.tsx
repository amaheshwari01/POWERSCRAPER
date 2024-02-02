import { Button } from "@chakra-ui/react";

export default function MoodleOut() {
    const logout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.removeItem("cookies")
        localStorage.removeItem("classData")
        let keystoremove = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('https')) {
                keystoremove.push(key)
            }
        }
        keystoremove.forEach((key) => {
            localStorage.removeItem(key)
        });

        window.location.reload();
    }
    return (
        <Button colorScheme={"red"} onClick={logout}>Logout of Moodle</Button>
    )
}