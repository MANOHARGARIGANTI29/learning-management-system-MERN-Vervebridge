
import axios from "axios";
import { server } from "../store";


export const getAllCourses = (category="", keyword="") => async dispatch => {
    try {
      dispatch({ type: 'allCourseRequest' });
  
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`,
      );
  
      dispatch({ type: 'allCourseSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCourseFail',
        payload: error.response.data.message,
      });
    }
  };

  export const getCourseLectures = id => async dispatch => {
    try {
      dispatch({ type: 'getCourseRequest' });
  
      const { data } = await axios.get(`${server}/course/${id}`, {
        withCredentials: true,
      });
  
      dispatch({ type: 'getCourseSuccess', payload: data.lectures });
    } catch (error) {
      dispatch({
        type: 'getCourseFail',
        payload: error.response.data.message,
      });
    }
  };