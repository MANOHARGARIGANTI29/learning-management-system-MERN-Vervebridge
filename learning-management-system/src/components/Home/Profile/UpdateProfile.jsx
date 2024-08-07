import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../Redux/Actions/profile";
import { loadUser } from "../../../Redux/Actions/user";

const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user.name ); // Add fallback if user is undefined
    const [email, setEmail] = useState(user.email ); 
    const {loading} = useSelector(state => state.profile)
    const dispatch = useDispatch();
    const submitHandler = async(e)=>{
        e.preventDefault();
        await dispatch(updateProfile(name,email))
        dispatch(loadUser());
    }
  
  return (
        <Container py={'8'} minH={'90vh'}>
            <Heading my={'16'} textTransform={'uppercase'} textAlign={['center', 'left']} children="Update Profile" />
            <form onSubmit={submitHandler}>
                <VStack spacing={'8'}>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username"
                        focusBorderColor="red.500"
                    />
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        focusBorderColor="red.500"
                    />
                    <Button isLoading={loading}  w={'full'} colorScheme="red">
                        Update
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default UpdateProfile;
