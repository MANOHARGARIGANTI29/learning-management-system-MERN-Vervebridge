import { Container, Heading, VStack,Box,Input,FormLabel, Textarea, Button} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {contactUs} from "../../../Redux/Actions/other"
import toast from "react-hot-toast";

const ContactUs = () =>{
    const [name,setName]= useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
const dispatch = useDispatch();
const {loading,error,message:stateMessage} = useSelector(state =>state.other)
const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(contactUs(name,email,message))
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
                    <Heading children='Contact Us'/>
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
                    <FormLabel htmlFor="message" children="Message"/>
                    <Textarea
                     required
                      id="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Your Message..."
                    type="text"
                    focusBorderColor="red.300"/>
                    </Box >
                    <Button isLoading={loading} my='4' colorScheme={'red'} type="submit">
                        Send Mail
                    </Button >
                    <Box my={'4'}>
                        Request For a Course?{' '}
                        <Link to='/request'>
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

export default ContactUs