import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const PageNoteFound = () =>{
    return(
        <div>
            <Container h={'90vh'} >
                <VStack justifyContent={'center'} height={'full'} spacing={'4'} >
                    <RiErrorWarningFill size={'5rem'}/>
                    <Heading>Page Not Found</Heading>

                    <Link to='/'><Button variant={'ghost'}>Go To Home</Button></Link>
                </VStack>

            </Container>
        </div>
    )
}

export default PageNoteFound;