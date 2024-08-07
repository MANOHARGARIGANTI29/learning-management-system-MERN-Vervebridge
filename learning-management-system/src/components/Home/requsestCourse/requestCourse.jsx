import { Container, Heading, VStack,Box,Input,FormLabel, Textarea, Button} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom";
import {courseRequest} from "../../../Redux/Actions/other"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";
const Request = () =>{
    const [name,setName]= useState("");
    const [email,setEmail] = useState("");
    const [course,setCourse] = useState("");
    const dispatch = useDispatch();
    const {loading,error,message:stateMessage} = useSelector(state =>state.other)
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(courseRequest(name,email,course))
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:'clearError'})
        }
        if(stateMessage){
            toast.success(stateMessage);
            dispatch({type:'clearmessage'})
        }
    },[dispatch,error,stateMessage])

    return(
        <div>
             <Container h='92vh'>
                <VStack h={"full"} justifyContent={"center"} spacing={"12"}>
                    <Heading children='Request New Course'/>
                    <form onSubmit={submitHandler} style={{width:"100%"}}>
                    <Box my={'4'}>
                    <FormLabel htmlFor="username" children="Username"/>
                    <Input required id="username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="abc"
                    type="text"
                    focusBorderColor="red.300"/>
                    </Box >
                    <Box my={'4'}>
                    <FormLabel htmlFor="email" children="Email Address"/>
                    <Input required id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    type="email"
                    focusBorderColor="red.300"/>
                    </Box >
                    <Box my={'4'}>
                    <FormLabel htmlFor="course" children="Course"/>
                    <Textarea
                     required
                      id="course"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    placeholder="Explain the Course"
                    type="text"
                    focusBorderColor="red.300"/>
                    </Box >
                    <Button isLoading={loading} my='4' colorScheme={'red'} type="submit">
                        Send Mail
                    </Button>
                    <Box my={'4'}>
                        See Available Courses {" "}
                        <Link to='/courses'>
                        <Button colorScheme="red" variant={'link'}>
                           Click
                        </Button> {" "}
                        here
  
                        </Link>
                    </Box>

                    </form>
                </VStack>

             </Container>
        </div>
    )
}

export default Request