import { Container, VStack,Heading, FormLabel ,Input,Box, Button, Avatar} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../../Redux/Actions/user";
export const fileUploadcss = {
    cursor:"pointer",
    marginLeft:"-5%",
    width:"110%",
    border:"none",
    height:"100%",
    color:"red",
    backgroundColor:"white",
}
const fileUploadStyle = {
    "&::file-selector-button":fileUploadcss,
}

const SignUp = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName]= useState("");
    const [imagePrev,setImagePrev]= useState("");
    const [image,setImage] = useState("");

    const dispatch = useDispatch();
    const changeFileHandler = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImagePrev(reader.result);
            setImage(file);
        }

    }
    const submitHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("name",name);
        myForm.append("email",email);
        myForm.append("password",password);
        myForm.append("file",image);


        dispatch(register(myForm))
    }
    return(
        <div>
        <Container my={"16"} h={"auto"}>
            <VStack h={"full"} justifyContent="center" spacing={'16'}>
                <Heading textTransform={"uppercase"} children={"Registration"}/>
                <form onSubmit={submitHandler} style={{width:"100%"}}>
                    <Box my={"4"} display={'flex'} justifyContent={'center'}>
                        <Avatar src={imagePrev} size={'2xl'} />

                    </Box>
                    <Box my={'4'}>
                    <FormLabel htmlFor="username" children= "Username"/>
                    <Input required id="username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Your UserName"
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
                    <FormLabel htmlFor="password" children="Password"/>
                    <Input required id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    type="password"
                    focusBorderColor="red.300"/>
                    </Box>
                    <Box my={'4'}>
                    <FormLabel htmlFor="ChooseAvatar" children="Choose Avatar"/>
                    <Input
                    accept="image/*"
                    required 
                    id="ChooseAvatar"
                    type={'file'}
                    focusBorderColor="red.300"

                    css={fileUploadStyle}
                    onChange={changeFileHandler}/>
                    </Box>
                    <Button my='4' colorScheme="red" type="submit">
                        SignUp
                    </Button>
                    <Box my={'4'}>
                          Already have an account?{' '}
                        <Link to='/login'>
                        <Button colorScheme="red" variant={'link'}>
                            Login
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
export default SignUp;