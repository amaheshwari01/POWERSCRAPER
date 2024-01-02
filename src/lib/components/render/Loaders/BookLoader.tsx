import { useColorMode, useColorModeValue } from "@chakra-ui/react"
export default function BookLoader() {
  return (
    // <Box maxW="500px" maxH="300px">

    <iframe scrolling="no" allowTransparency={true} height={"300px"} src={useColorModeValue("src/lib/components/render/Loaders/book.html", "src/lib/components/render/Loaders/bookdark.html")}></iframe>

    // </Box>
  )
}