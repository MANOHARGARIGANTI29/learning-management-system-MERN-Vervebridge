import { Heading, Stack, VStack,Text, Button,Image,Box, HStack } from "@chakra-ui/react";
import "./home.css";
import { Link } from "react-router-dom";
import vg  from "../../../Assets/images/20944343.jpg"
import {CgGoogle,CgYoutube} from "react-icons/cg";
import {SiCoursera,SiUdemy} from "react-icons/si";
import {DiAws} from "react-icons/di";
import introVideo from "../../../Assets/videos/LMS_Intro.mp4"
const Home = ()=>{
    return(
       <section className="home">
        <div className="container">
            <Stack
            direction={['column','row']}
            height="100%"
            justifyContent={['center',"space-between"]}
            alignItems="center"
            spacing={['16','56']}>
                <VStack width={'full'} alignItems={['center','flex-end']} spacing="8">
                    <Heading children="LEARN FROM THE EXPERTS" size={'2xl'}/>
                    <Text fontSize={'2xl'}
                    fontFamily="monospace"
                    textAlign={['center','left']} children="Find Valueable Content At Reasonable Price"/>
                    <Link to="/courses">
                      <Button size={"lg"} colorScheme="red" >Explore Now</Button>
                    </Link>
                </VStack>
                <Image className="vector-graphics" boxSize={"md"} src={vg} objectFit="contain" />
            </Stack>
        </div>
        <Box padding={'8'} bg="black">
            <Heading textAlign={"center"} fontFamily="body" color={"red.400"} children="OUR BRANDS"/>
            <HStack className="brandsBanner" justifyContent={"space-evenly"} marginTop="4">
                <CgGoogle/>
                <CgYoutube/>
                <SiCoursera/>
                <SiUdemy/>
                <DiAws/>

            </HStack>
        </Box>
        <div className="container2">
            <video autoPlay loop muted  controls controlsList="nodownload nofullscreen noremoteplayback" 
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}>

            </video>
        </div>
       </section>
    )
}
export default Home;