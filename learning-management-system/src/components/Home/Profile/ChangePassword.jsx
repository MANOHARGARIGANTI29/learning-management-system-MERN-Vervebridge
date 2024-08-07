import { Container, Heading, VStack,Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../Redux/Actions/profile";
import toast from "react-hot-toast";

const ChangePassword = () =>{
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
        const dispatch = useDispatch();
        const submitHandler = e => {
          e.preventDefault();
          dispatch(changePassword(oldPassword, newPassword));
        };
      
        const { loading, message, error } = useSelector(state => state.profile);
      
        useEffect(() => {
          if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
          }
          if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
          }
        }, [dispatch, error, message]);
      
    return(
        <div>
            <Container py={"16"} minH={"90vh"}>
                <Heading textTransform={'uppercase'} my={"16"} alignItems={['center','left']} children="Change Password"/>
                <form onSubmit={submitHandler}>
                <VStack spacing={'8'}>
                <Input  required id="OldPassword"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Enter Your OldPassword"
                    type="Password"
                    focusBorderColor="red.300"/>
                <Input  required id="NewPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter Your NewPassword"
                    type="Password"
                    focusBorderColor="red.300"/>
                    <Button isLoading={loading}  w={'full'} colorScheme="red" type="submit">Change</Button>
                </VStack>
                 </form>
            </Container>
        </div>
    )
}
export default ChangePassword;