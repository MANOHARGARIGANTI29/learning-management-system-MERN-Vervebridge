import { Grid,Box, Heading ,Text, VStack} from "@chakra-ui/react";
import introVideo from '../../../Assets/videos/lv_0_20240627112125.mp4'
import { useState } from "react";

const CoursePage = () =>{
    const[lectureNumber,setLectureNumber] = useState(0);
    const lectures = [
        {
            _id:"kabr",
            title:"functions",
            description:"basics of function",
            video:{
                url:"jsrbg"
            },
        },
        {
            _id:"kabr",
            title:"objects",
            description:"basics of objects",
            video:{
                url:"jsrbg"
            },
        },
        {
            _id:"kabr",
            title:"async await",
            description:"basics of async and await",
            video:{
                url:"jsrbg"
            },
        },
    ]

    return(
        <div>
            <Grid minH={'90vh'} templateColumns={['1fr','3fr 1fr']}>
                <Box>
                   <video width={'100%'}
                   controls
                   controlsList='nodownload noremoteplayback' disablePictureInPicture
                   disableRemotePlayBack
                   src={introVideo}>
                     
                   </video>
                   <Heading m='4' children={`#${lectureNumber+1} ${lectures[lectureNumber].title}`}/>
                   <Heading  m='4' children="Description"/>
                   <Text m="4" children={lectures[lectureNumber].description}></Text>
                </Box>
                <VStack>
                    {
                        lectures.map((element,index)=>(
                            <button
                            onClick={()=>setLectureNumber(index)}
                            key={element._id}
                            style={{
                            width:"100%",
                            padding:"1rem",
                            textAlign:"center",margin:0,
                            borderBottom:"1px solid rgba(0,0, 0,0.2)"
                            }}>
                                <Text noOfLines={1}>
                                    #{index +1}{
                                        element.title
                                    }
                                </Text>
                            </button>
                        ))
                    }
                </VStack>
            </Grid>
        </div>
    )
}
export default CoursePage;