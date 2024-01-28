import { Button } from "@chakra-ui/react";

export default function MoodleOut() {
    const logout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.removeItem("cookies")

        window.location.reload();
    }
    return (
        <Button onClick={logout}>Logout</Button>
    )
}