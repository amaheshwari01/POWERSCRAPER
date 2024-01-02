import { useColorModeValue } from "@chakra-ui/react"
export default function BookLoader() {
  return (
    // <Box maxW="500px" maxH="300px">

    <iframe scrolling="no" height={"300px"} src={useColorModeValue("/assets/loaders/book.html", "/assets/loaders/bookdark.html")}></iframe>

    // </Box>
  )
}