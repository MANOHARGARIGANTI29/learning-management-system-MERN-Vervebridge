import {Box, Heading, HStack, Stack, VStack} from "@chakra-ui/react"
import {TiSocialYoutubeCircular,TiSocialInstagramCircular} from "react-icons/ti"
import {DiGithub} from "react-icons/di";


const Footer = () =>{
    return(
        <div>
            <Box padding={"4"} bg={'blackAlpha.900'} minH={'10vh'}>
                <Stack direction={['column','row']}>
                    <VStack alignItems={['center','flex-start']} width={'full'}>
                        <Heading children="All Rights Reserved" color={'white'}/>
                        <Heading fontFamily={'body'}
                        size="sm"
                         children="@manohar_gariganti" color={'red.400'}/>

                    </VStack>
                    <HStack spacing={['2','10']} justifyContent="center"
                    color={"white"}
                    fontSize={40}>
                        <a href="https://youtube.com/@manohargariganti4746" target={'blank'} >
                          <TiSocialYoutubeCircular/>
                        </a>
                        <a href="https://instagram.com/manohar_gariganti" target={'blank'}>
                          <TiSocialInstagramCircular/>
                        </a>
                        <a href="https://github.com/manohargariganti29" target={'blank'}>
                          <DiGithub/>
                        </a>

                    </HStack>
                    
                </Stack>

            </Box>
        </div>
    )
}

export default Footer;