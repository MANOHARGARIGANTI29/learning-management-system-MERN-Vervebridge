import { Button, Container, Heading,HStack,Text,Input, Stack, VStack ,Image} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getAllCourses } from "../../../Redux/Actions/course"
import toast from "react-hot-toast"
import { addToPlaylist } from "../../../Redux/Actions/profile"
import {loadUser} from "../../../../src/Redux/Actions/user"
const Course = ({Views,title,imageSrc,id,addToPlaylistHandler,creator,description,lecturecount,loading})=>{
    return(
     <VStack className="course" alignItems={['center','flex-start']}>
        <Image src={imageSrc} boxSize="60" objectFit={"contain"}/>
        <Heading textAlign={['center',"left"]}
        maxW="200px"
        size={"md"}
        fontFamily={'monospace'}
        noOfLines={3}
        children={title}/>
        <Text noOfLines={2} children={description}/>
        <HStack>
        <Text fontWeight={'bold'}
        textTransform={"uppercase"}
         children={"creator"}/>
        <Text fontFamily={'body'}
        textTransform={"uppercase"}
         children={creator}/>
        </HStack>
        <Heading textAlign={"center"}
        size="xs"
        children={`Lectures - ${lecturecount}`}
        textTransform="uppercase"/>
        <Heading
        size="xs"
        children={`Views - ${Views}`}
        textTransform="uppercase"/>
        <Stack direction={["column",'row']}
        alignItems='center'>
            <Link to={`/course/${id}`}>
            <Button colorScheme={'red'} >
            Watch Now</Button></Link>
            <Button
            isLoading={loading}
            variant={'ghost'}
            colorScheme={'red'}
            onClick={()=>addToPlaylistHandler(id)}>
                Add to Playlist
            </Button>

        </Stack>
     </VStack>
    )  
}

const Courses = () =>{
    const[keyword,setKeyword] = useState("");
    const [category,setCategory] = useState("");
    const dispatch = useDispatch();
    const addToPlaylistHandler = async(courseId)=>{
        console.log("added to the play list",courseId);
       await dispatch(addToPlaylist(courseId));
       dispatch(loadUser());
    }
    const Categories = [
        "Web Development",
        "App Development",
        "Artificial Intelligence",
        "Game Development",
        "Data Science",
        "Data Structure & Algorithms"

    ]
    const {loading,courses,error,message} = useSelector(state=>state.course)
    useEffect(()=>{
     dispatch(getAllCourses(category,keyword))
     if(error){
        toast.error(error);
          dispatch({type:'clearError'})  
     }
     if(message){
        toast.success(message);
          dispatch({type:'clearMessage'})  
        
     }
    },[category,keyword,dispatch,error,message])
    return(
        <div>
           <Container minH={'95vh'} maxW='container.lg' paddingY={'8'}>
            <Heading children='All Courses' m={'8'}/>
            <Input value={keyword}
            onChange={e => setKeyword(e.target.value)} placeholder="Search a Course..."
            type={'text'}
            focusBorderColor="red.100"/>
            <HStack overflowX={"auto"} paddingY="8">
              {
                Categories.map((item,index)=>(
                    <Button key={index} onClick={()=>setCategory(item)} minW={'60'}><Text children={item}/></Button>
                ))
              }
            </HStack>
            <Stack
            direction={["column","row"]}
            flexWrap="wrap"
            justifyContent={["flex-start","space-evenly"]}
            alignItems={['center,flex-start']}
            >
               {
                courses.length > 0?courses.map((item)=>(
                    <Course
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    Views={item.views}
                    imageSrc={item.poster?item.poster.url:""}
                    id={item._id}
                    creator={item.createdBy}
                    lecturecount={item.numOfVideos}
                    addToPlaylistHandler={addToPlaylistHandler}
                    loading={loading}/>
                )):<Heading opacity={0.5} mt="4" children="Courses Not Found"/>
               }
            </Stack>

           </Container>
        </div>
    )
}

export default Courses