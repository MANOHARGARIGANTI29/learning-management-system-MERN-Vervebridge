import { Container, VStack,Heading, FormLabel ,Input,Box, Button} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../../Redux/Actions/user";
import {useDispatch} from "react-redux";
const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch()
    const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(login(email,password));
    }
    return(
        <div>
        <Container h={"95vh"}>
            <VStack h={"full"} justifyContent="center" spacing={'16'}>
                <Heading children={"Welcome To Learning Management System"}/>
                <form onSubmit={submitHandler} style={{width:"100%"}}>
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
                    <FormLabel htmlFor="Password" children="Password"/>
                    <Input required id="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    type="Password"
                    focusBorderColor="red.300"/>
                    </Box>

                    <Box>
                        <Link to='/forgetpassword' >
                        <Button fontSize={'sm'} variant="link">
                            Forget Password?
                        </Button>
                        </Link>
                    </Box>

                    <Button my='4' colorScheme="red" type="submit">
                        Login
                    </Button>
                    <Box my={'4'}>
                        New User?{' '}
                        <Link to='/register'>
                        <Button colorScheme="red" variant={'link'}>
                            SignUp
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
export default Login;