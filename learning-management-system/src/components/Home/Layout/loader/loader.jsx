import {Spinner, VStack } from "@chakra-ui/react";

const Loader = ({color="red.500"}) =>{
    return(
        <div style={{transform:"scale(4)"}}>
           <VStack h="100vh" justifyContent={'center'}>
            <div>
                <Spinner thickness="2px" speed="0.65s" emptyColor="transparent" color={color}
                size={"xl"}/>
            </div>
           </VStack>
        </div>
    )
}

export default Loader;