import { Grid , Container, Heading, VStack, Input,Select,Image, Button } from "@chakra-ui/react";
import cursor from '../../../../Assets/images/cursor.png'
import Sidebar from "../dashboard/sidebar";
import { useEffect, useState } from "react";
import { fileUploadcss } from "../../Auth/Register";
import { createCourse } from "../../../../Redux/Actions/admin";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'
const Createcourse = () =>{
    const [title,SetTitle] = useState("");
    const [description,SetDescription] = useState("");
    const [createdBy,SetCreatedBy] = useState("");
    const [category,SetCategory] = useState("");
    const [image,SetImage] = useState("");
    const [imagePrev,SetImagePrev] = useState("");

    
    const Categories = [
        "Web Development",
        "App Development",
        "Artificial Intelligence",
        "Game Development",
        "Data Science",
        "Data Structure & Algorithms"

    ]
    const changeFileHandler = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            SetImagePrev(reader.result);
            SetImage(file);
        }

    }

    const dispatch = useDispatch();
    const {loading,error,message} = useSelector(state=>state.admin)
         const submitHandler =(e)=>{
            e.preventDefault();
             const myForm = new  FormData();
             myForm.append('title',title);
             myForm.append('description',description);
             myForm.append('category',category);
             myForm.append('createdBy',createdBy);
             myForm.append('file',image);

             dispatch(createCourse(myForm))
         }
        

         useEffect(()=>{
             if(error){
                toast.error(error);
                dispatch({type:"clearError"})
             }
             if(message){
                toast.success(message);
                dispatch({type:'clearMessage'})
             }
         },[dispatch,error,message])
    return(
        <div>
             <Grid css={{
                cursor:`url(${cursor}),default`,
             }}
             minH={'100vh'}
             templateColumns={['1fr','5fr 1fr']}>
                <Container py={'16'}>
                 <form onSubmit={submitHandler}>
                 <Heading textTransform={'uppercase'} children="Create Course" my={"16"} textAlign={['center','left']}/>
                  <VStack m="auto"
                  spacing={"8"}>
                  <Input
                  value={title}
                  onChange={e=>SetTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  focusBorderColor="purple.300"/>{' '}
                  <Input
                  value={description}
                  onChange={e=>SetDescription(e.target.value)}
                  placeholder="Description"
                  type="text"
                  focusBorderColor="purple.300"/>
                  <Input
                  value={createdBy}
                  onChange={e=>SetCreatedBy(e.target.value)}
                  placeholder="CreatedBy"
                  type="text"
                  focusBorderColor="purple.300"/>
                  <Select focusBorderColor="purple.300" value={category}
                  onChange={e=>SetCategory(e.target.value)}>
                   <option value="">
                     Category
                   </option>
                   {
                    Categories.map(item=>(
                        <option key={item} value={item}>{item}</option>
                    ))
                   }
                  </Select>
                  <Input
                  accept="image/"
                  required
                  id="chooseAvatar"
                  type="file"
                  focusBorderColor="purple.300"
                  css={{"&::file-selector-button":{...fileUploadcss,color:"purple",},
                }}
                  onChange={changeFileHandler}/>
                  {
                    imagePrev && (
                        <Image src={imagePrev} boxSize="64"
                        objectFit={'contain'}/>
                    )
                  }
                  <Button isLoading={loading} w={"full"} colorScheme="purple" type="submit" children={"Create"}/>
                  </VStack>
                 </form>
                     
                </Container>
                <Sidebar/>

             </Grid>
        </div>
    )
}
export default Createcourse;