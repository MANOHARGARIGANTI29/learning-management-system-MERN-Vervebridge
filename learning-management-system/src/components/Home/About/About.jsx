import { Avatar,Box, Container, Heading, Stack, VStack ,Text, Button, HStack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import introVideo from "../../../Assets/videos/LMS_Intro.mp4"
import { RiSecurePaymentFill } from "react-icons/ri";
import termsAndCondition from "../../../Assets/docs/termsAndConditions";
import iamgeul from '../../../Assets/images/WhatsApp Image 2024-06-02 at 1.22.20 AM.jpeg';
const Founder = () =>(
    <Stack direction={["column","row"]} spacing={["4","16"]}
    padding={'8'}>
        <VStack>
            <Avatar src={iamgeul} boxSize={['40','48']}/>
            <Text children="Co-Founder" opacity={0.7}/>
        </VStack>
        <VStack justifyContent={"center"} alignItems={["center","flex-start"]}>
            <Heading children="Manohar Gariganti" size={['md','xl']}/>
            <Text textAlign={['center','left']}
            children={"Hi, I am a full-stack developer"}/>
        </VStack>

    </Stack>
)
const VideoPlayer = () =>(
    <Box>
          <video autoPlay loop muted controls controlsList="nodownload nofullscreen noremoteplayback" 
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}>
            </video>    
    </Box>
)

const TandC = ({termsAndCondition}) =>(
    <Box overflow={"scroll"}>
        <Heading size={"md"}
        children={"Terms & Condition"}
        textAlign={["center","left"]}
        my={"4"}/>
        <Box h={"sm"} p={"4"}>
            <Text fontFamily={"heading"} letterSpacing={"widest"} textAlign={["center","left"]}>{termsAndCondition}</Text>
            <Heading my={"4"} size={"xs"} children={"Refund only applicable for cancellation within 7 days"}/>

        </Box>
    </Box>
)


const About = () =>{
    return(
        <div>
             <Container maxW={"container.lg"} padding={"16"} boxShadow={"lg"}>
                <Heading children="About Us" textAlign={["center","left"]}/>
                  <Founder/>
                  <Stack m="8" direction={['column',"row"]} alignItems={"center"}>
                    <Text fontFamily={"cursive"} m={"8"} textAlign={["center","left"]}>
                        We are video streaming platform with some premium courses available
                        only for premium users.
                    </Text>
                     <Link to="/subscribe">
                     <Button variant={"ghost"} colorScheme="red">
                        Checkout Our Plan
                     </Button>
                     </Link>
                  </Stack>
                  <VideoPlayer/>
                  <TandC termsAndCondition={termsAndCondition}/> 
                  <HStack my={"4"} p={"4"}>
                    <RiSecurePaymentFill/>
                    <Heading size={"xs"} fontFamily={"sans-serif"} textTransform={"uppercase"} children={"Payment is secured by Razorpay"}/>
                  </HStack>
             </Container>
        </div>
    )
}

export default About;