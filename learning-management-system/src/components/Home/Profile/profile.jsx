import {
  Avatar,
  Button,
  Container,
  Heading,
  Stack,
  VStack,
  Text,
  HStack,
  Image,
  ModalOverlay,
  Input,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { fileUploadcss } from "../Auth/Register";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPlaylist } from "../../../Redux/Actions/profile";
import { updateProfilePicture } from "../../../Redux/Actions/profile";
import { loadUser } from "../../../Redux/Actions/user";
import toast from "react-hot-toast";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const {loading,message,error} =useSelector(state=>state.profile)
  const removeFromPlaylistHandler =async (id) => {
    console.log(id);
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser())
  };

  const changeImageSubmitHandler = async(e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file',image);
    await dispatch(updateProfilePicture(myForm))
    dispatch(loadUser());
  };
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'})
    }
  },[dispatch,error,message])

  const { isOpen, onClose, onOpen } = useDisclosure();

  // Add a check to ensure user is defined
  return (
    <div>
      <Container minH={"95vh"} maxW={"container.lg"} py="8">
        <Heading children="Profile" m="8" textTransform={"uppercase"} />
        <Stack
          justifyContent={"flex-start"}
          direction={["column", "row"]}
          alignItems={"center"}
          spacing={["8", "16"]}
          padding={"8"}
        >
          <VStack>
            <Avatar boxSize={"48"} src={user.avatar.url} />
            <Button onClick={onOpen} colorScheme="red" variant={"ghost"}>
              Change Photo
            </Button>
          </VStack>
          <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
            <HStack>
              <Text children="Username" fontWeight={"bold"} />
              <Text children={user.name} />
            </HStack>
            <HStack>
              <Text children="Email" fontWeight={"bold"} />
              <Text children={user.email} />
            </HStack>
            <HStack>
              <Text children="CreatedAt" fontWeight={"bold"} />
              <Text children={user.createdAt.split("T")[0]} />
            </HStack>
            {user.role !== "admin" && (
              <HStack>
                <Text children="Subscription" fontWeight={"bold"} />
                {user.subscription && user.subscription.status === "active" ? (
                  <Button variant={"ghost"} color={"red.500"}>
                    Cancel Subscription
                  </Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme="red">Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}
            <Stack direction={["column", "row"]} alignItems={"center"}>
              <Link to="/updateprofile">
                <Button>Update Profile</Button>
              </Link>
              <Link to="/changepassword">
                <Button>Change Password</Button>
              </Link>
            </Stack>
          </VStack>
        </Stack>
        <Heading children="Playlist" size={"md"} my={"8"} />
        {user.playlist?.length > 0 && (
          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            flexWrap={"wrap"}
            p={"4"}
          >
            {user.playlist.map((element, index) => (
              <VStack w={"48"} m="2" key={index}>
                <Image boxSize={"full"} objectFit="contain" src={element.poster} />
                <HStack>
                  <Link to={`/course/${element.course}`}>
                    <Button variant={"ghost"} colorScheme="red">
                      Watch Now
                    </Button>
                  </Link>
                  <Button  isLoading={loading} onClick={() => removeFromPlaylistHandler(element.course)}>
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            ))}
          </Stack>
        )}
        <ChangePhotoBox
          changeImageSubmitHandler={changeImageSubmitHandler}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Container>
    </div>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev("");
    setImage("");
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropBlur={"blur(10px)"} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                {imagePrev && <Avatar src={imagePrev} boxSize={"48"} />}
                <Input
                  type="file"
                  css={{ "&::file-selector-button": fileUploadcss }}
                  onChange={changeImage}
                />
                <Button w={"full"} colorScheme="red" type="submit">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={"3"} onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
