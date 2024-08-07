import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../../../ColorModeSwitcher";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../Redux/Actions/user";

const LinkButton = ({ url = "/", title = "Home", onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch()
  const logoutHandler = () => {
    onClose();
    dispatch(logout())
  };

  return (
    <div>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={"red"}
        width="12"
        height={"12"}
        rounded="full"
        zIndex={"overlay"}
        position={"fixed"}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(5px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>
            LEARNING MANAGEMENT SYSTEM
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={"4"} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton onClose={onClose} url="/Courses" title="Browse All Courses" />
              <LinkButton onClose={onClose} url="/request" title="Request a Course" />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
              <HStack justifyContent={"space-evenly"} position="absolute" bottom={"2rem"} width="80%">
                {isAuthenticated ? (
                  <VStack>
                    <HStack>
                      <Link onClick={onClose} to="/profile">
                        <Button variant={'ghost'} colorScheme={'red'}>Profile</Button>
                      </Link>
                      <RiLogoutBoxLine />
                      <Button variant={'ghost'} onClick={logoutHandler}>Logout</Button>
                    </HStack>
                    {user && user.role === "admin" && (
                      <Link onClick={onClose} to="/admin/dashboard">
                        <Button colorScheme={"pink"} variant="ghost">
                          <RiDashboardFill style={{ margin: '4px' }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                ) : (
                  <>
                    <Link onClick={onClose} to='/login'>
                      <Button colorScheme={'red'}>Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose} to='/register'>
                      <Button colorScheme={'red'}>SignUp</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
