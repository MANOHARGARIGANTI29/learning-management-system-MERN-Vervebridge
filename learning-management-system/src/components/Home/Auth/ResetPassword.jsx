import { Container, Heading, VStack ,FormLabel,Input, Button} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () =>{
    const [password,setPassword] = useState("");
    const params = useParams();
    console.log(params)

    return(
        <div>
           <Container padding={'16'} h={'90vh'}>
             <form>
                <Heading children='Reset Password'
                my='16'
                textTransform={'uppercase'}
                textAlign={['center','left']}/>
                <VStack spacing={'8'}>
                <FormLabel htmlFor="password" children="Change Password"/>
                    <Input required id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter New Password"
                    type="password"
                    focusBorderColor="red.300"/>
                    <Button type="submit" w={'full'} colorScheme="red">
                        Reset Password
                    </Button>

                </VStack>
             </form>
           </Container>
        </div>
    )
}

export default ResetPassword;