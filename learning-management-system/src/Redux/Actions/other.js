import { server } from "../store";
import axios from 'axios';


export const contactUs = (name,email,message) => async dispatch => {
    try {
        const config ={
headers:{
    'Content-type' :'application/json',
},
withCredentials:true,
        }
      dispatch({ type: 'contactRequest' });
  
      const { data } = await axios.post(
        `${server}/contact`,{name,email,message},config
      );
      console.log(data)
      dispatch({ type: 'contactSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'contactFail', payload: error.response.data.message });
    }
  };
export const courseRequest = (name,email,course) => async dispatch => {
    try {
        const config ={
headers:{
    'Content-type' :'application/json',
},
withCredentials:true,
        }
      dispatch({ type: 'courseRequest' });
  
      const { data } = await axios.post(
        `${server}/courserequest`,{name,email,course},config
      );
      console.log(data)
      dispatch({ type: 'courseSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'courseFail', payload: error.response.data.message });
    }
  };