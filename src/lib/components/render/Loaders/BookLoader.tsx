import { useColorModeValue } from "@chakra-ui/react"
export default function BookLoader() {
  return (
    // <Box maxW="500px" maxH="300px">

    <iframe scrolling="no" allowTransparency={true} height={"300px"} src={useColorModeValue("public/assets/loaders/book.html", "public/assets/loaders/bookdark.html")}></iframe>

    // </Box>
  )
}