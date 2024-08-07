
import { Container, Heading, VStack,Box,Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../Redux/store";
import { buySubscription } from "../../../Redux/Actions/user";
import toast from "react-hot-toast";
import logo from './../../../Assets/images/20944343.jpg'
const Subscription = ({user}) =>{
    const dispatch = useDispatch();
    const [key,setKey] = useState('');
    const {loading,error,subscriptionId}= useSelector(state=>state.subscription)
    const { error:courseError } = useSelector(state => state.course); // Assuming you have this in your state
    const subscribeHandler = async () => {
        const {
          data: { key },
        } = await axios.get(`${server}/razorpaykey`);
    
        setKey(key);
        dispatch(buySubscription());
      };
    useEffect(()=>{
        if(error){
            toast.error(courseError);
            dispatch({type:'clearError'});
        }
        if(subscriptionId){
            const openPopUp=()=>{
                const options={key,name:"learning-management-system",
                    description:"Get access to all premium content",
                    image:logo,
                    subscription_id:subscriptionId,
                    callback_url:`${server}/paymentverificcation`,
                    prefill:{
                        name:user.name,
                        email:user.email,
                        contact:""
                    },
                    notes:{
                        address:"KRIVENJAG at youtube"
                    },
                    theme:{
                        color:"#FFC800"
                    }
                };
                const razor = new window.Razorpay(options);
                razor.open();
            }
            openPopUp()
        }
    },[dispatch,error,user.name,user.email,key,subscriptionId,courseError])
    return(
        <div>
                 <Container h={"90vh"} p={"16"}>
            <Heading children={"Welcome"} my={"8"} textAlign={"center"}>
                <VStack boxShadow={"lg"} alignItems={"stretch"}
                borderRadius={"lg"}
                spacing={"0"}>
                    <Box bg={"red.400"} p={"4"} css={{borderRadius:"8px 8px 0 0 "}}>
                        <Text color={"black"}
                        children={"Pro Pack -₹299.00"}></Text>
                    </Box>
                    <Box p={"4"}>
                        <VStack textAlign={"center"} px={"8"} mt={"4"} spacing={"8"}>
                            <Text  children={"Join pro pack and get access to all content."}>
                            </Text>
                            <Heading size={"md"} children={"₹299 Only"}/>
                        </VStack>

                        <Button my={"8"} w={"full"} colorScheme="red" onClick={subscribeHandler} isLoading={loading}>Buy Now</Button>
                    </Box>
                    <Box bg={"blackAlpha.600"} p={"4"} css={{borderRadius:'0 0 8px 8px'}}>
                        <Heading color={"white"} textTransform={"uppercase"}
                        size={"sm"}
                        children={"100% refund at cancellation"}>
                            
                        </Heading>
                        <Text fontSize={"xs"}
                        color={"white"}
                        children={"Terms &Conditions Apply"}></Text>

                    </Box>

                </VStack>

            </Heading>

          </Container>
        </div>
    )
}
export default Subscription;