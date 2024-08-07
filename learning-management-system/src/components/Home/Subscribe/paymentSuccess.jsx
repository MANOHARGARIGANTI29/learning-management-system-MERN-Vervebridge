import { Container,Heading, VStack,Box,Text, Button } from "@chakra-ui/react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PaymentSuccess = () =>{
    return(
        <div>
            <Container h={"90vh"} p={"16"}>
                <Heading my={"8"} alignItems={"center"}>
                   You have a Pro Pack
                </Heading>
                    <VStack boxShadow={"lg"}
                    pb={"16"}
                    alignItems={"center"}
                    borderRadius={"center"}>
                     <Box w="full" bg="red.400" p="4"
                     css={{borderRadius:"8px 8px 0 0 "}}>
                        <Text color={"black"} >Payment Success</Text>
                     </Box>
                     <Box p="4">
                        <VStack textAlign={"center"} px={"8"} mt="4" spacing={"8"}>
                            <Text>Congratulations you're a pro member. You have access to premium content.</Text>
                             <Heading size={"4xl"} >
                                <RiCheckboxCircleFill/>
                             </Heading>
                        </VStack>
                     </Box>
                     <Link to="/profile"><Button variant={"ghost"}>Go to  Profile </Button></Link>
                     <Heading size={"xs"}>
                             Reference:manohar 
                     </Heading>
                    </VStack>
            </Container>
        </div>
    )
}
export default PaymentSuccess;