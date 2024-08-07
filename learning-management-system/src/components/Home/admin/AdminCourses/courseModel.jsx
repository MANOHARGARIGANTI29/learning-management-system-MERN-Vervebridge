
import { Modal, ModalContent, ModalOverlay,Text,Grid,Box,ModalHeader, ModalCloseButton, ModalBody, Heading, Stack, Button, VStack, Input, ModalFooter} from "@chakra-ui/react";
import { useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileUploadcss } from "../../Auth/Register";

const CourseModel = ({isOpen,onClose,id,deleteButtonHandler,addLectureHandler,courseTitle,lectures=[],loading,})=>{

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [video,setVideo] = useState("")
    const [videoPrev,setVideoPrev] = useState("")
    const changeVideoHandler = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setVideoPrev(reader.result);
            setVideo(file);
        }

    }
    const handleClose =()=>{
        setTitle("");
        setDescription("");
        setVideo("");
        setVideoPrev("");
        onClose();
    }

    return(
        <div>
            <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="outside" size={"full"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                         {courseTitle}               
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={'16'}>
                        <Grid templateColumns={['1fr','3fr 1fr']}>
                            <Box px={["0","16"]}>
                                <Box my="5">
                                     <Heading children={"courseTitle"}/>        
                                     <Heading children={`#${id}`} size={"sm"} opacity={0.4}/>   
                                </Box>
                                <Heading children={"Lectures"} size ="lg"/>
                                {
                                    lectures.map((item,index)=>(
                                        <VideoCard 
                                        key={index}
                                title={item.title}
                                description ={item.description}num={index+1}lectureId={item._id}courseId={id}deleteButtonHandler={deleteButtonHandler}
                            loading={loading} /> 
                                    ))
                                }
                            </Box>
                            <Box>
                                <form onSubmit={e=>addLectureHandler(e,id,title,description,video)}>
                                    <VStack spacing={"4"}>
                                        <Heading children="Add Lecture"
                                        size={"md"}
                                        textTransform={"uppercase"}/>
                                        <Input focusBorderColor="purple.300" placeholder="Title" value={title}
                                        onChange={e=>setTitle(e.target.value)}/>
                                        <Input focusBorderColor="purple.300" placeholder="Description" value={description}
                                        onChange={e=>setDescription(e.target.value)}/>
                                        <Input
                                        accept="video/mp4"
                                        required
                                        type="file"
                                        focusBorderColor="purple.300"
                                        css={{
                                            '&::file-selector-button':{
                                                ...fileUploadcss,
                                                color:"purple",
                                            }
                                        }}
                                        onChange={changeVideoHandler}/>
                                        {
                                            videoPrev && (
                                                <video controlsList="nodownload" controls src={videoPrev}></video>
                                            )
                                        }
                                        <Button isLoading={loading} w={"full"} colorScheme="purple" type="submit">Upload</Button>
                                    </VStack>
                                </form>
                                <ModalBody>
                                    <ModalFooter>
                                        <Button onClick={handleClose}>close</Button>
                                    </ModalFooter>
                                </ModalBody>
                            </Box>

                        </Grid>

                    </ModalBody>
                </ModalContent>
                 
            </Modal>
        </div>
    );
};

export default CourseModel;

function VideoCard({title,description,num,lectureId,courseId,deleteButtonHandler,loading}){
    return(
        <Stack direction={["column","row"]} my={'8'} borderRadius={"lg"} boxShadow={"0 0 10px rgba(107,70,193,0.5)"}
        justifyContent={["flex-start","space-between"]}
        p={['4','8']}>
            <Box>
                <Heading size={"sm"} children={`#${num}${title}`}/>
                <Text children={description}/>
            </Box>
            <Button 
            isLoading={loading}color={"purple.600"} onClick={()=>deleteButtonHandler(courseId,lectureId)}>
                <RiDeleteBin7Fill/>
            </Button>
        </Stack>

    ) }