import { Container, Heading, VStack ,FormLabel,Input, Button} from "@chakra-ui/react";
import { useState } from "react";

const ForgetPassword = () =>{
    const [email,setEmail] = useState("");
    return(
        <div>
           <Container padding={'16'} h={'90vh'}>
             <form>
                <Heading children='Forget Password'
                my='16'
                textTransform={'uppercase'}
                textAlign={['center','left']}/>
                <VStack spacing={'8'}>
                <FormLabel htmlFor="email" children="Email Address"/>
                    <Input required id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    type="email"
                    focusBorderColor="red.300"/>
                    <Button type="submit" w={'full'} colorScheme="red">
                        Send Reset Link
                    </Button>

                </VStack>
             </form>
           </Container>
        </div>
    )
}

export default ForgetPassword;