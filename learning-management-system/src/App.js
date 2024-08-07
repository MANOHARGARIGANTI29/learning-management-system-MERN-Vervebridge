import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home/Home';
import Header from './components/Home/Layout/Header/header';
import Courses from './components/Home/courses/courses';
import RequestCourses from './components/Home/requsestCourse/requestCourse';
import ContactUs from './components/Home/contactus/ContactUs';
import About from './components/Home/About/About';
import Footer from './components/Home/Layout/footer/footer';
import Login from './components/Home/Auth/Login';
import SignUp from './components/Home/Auth/Register';
import ForgetPassword from './components/Home/Auth/ForgetPassword';
import ResetPassword from './components/Home/Auth/ResetPassword';
import Subscription from './components/Home/Subscribe/Subscription';
import PageNoteFound from './components/Home/Layout/notFound/pageNotFound';
import PaymentSuccess from './components/Home/Subscribe/paymentSuccess';
import PaymentFail from './components/Home/Subscribe/paymentFail';
import CoursePage from './components/Home/CoursePage/CoursePage';
import Profile from './components/Home/Profile/profile';
import ChangePassword from './components/Home/Profile/ChangePassword';
import UpdateProfile from './components/Home/Profile/UpdateProfile';
import Dashboard from './components/Home/admin/dashboard/dashboard';
import Createcourse from './components/Home/admin/createcourse/createCourse';
import AdminCourses from './components/Home/admin/AdminCourses/adminCourses';
import Users from './components/Home/admin/users/users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from './Redux/Actions/user';
import {ProtectedRoute} from 'protected-route-react'
import Loader from './components/Home/Layout/loader/loader';

function App() {
  const { isAuthenticated, user, message, error ,loading} = useSelector(state => state.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  return (
    <div>
      <Router>
        {
          loading ? (<Loader/>) :(
            <>
            <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <CoursePage user={user} />
          </ProtectedRoute>} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile user ={user}/></ProtectedRoute>} />
          <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <ChangePassword   />
          </ProtectedRoute>} />
          <Route path='/updateprofile' element={<ProtectedRoute  isAuthenticated={isAuthenticated} >
            <UpdateProfile user={user}/>
          </ProtectedRoute>} />
          <Route path='/request' element={<RequestCourses />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
          <Login />
          </ProtectedRoute>
          } />
          <Route path='/register' element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
         <SignUp />
         </ProtectedRoute>
          } />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
          <Route path='/subscribe' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Subscription  user={user}/>
            </ProtectedRoute>
          } />
          <Route path='*' element={<PageNoteFound />} />
          <Route path='/paymentsuccess' element={<PaymentSuccess />} />
          <Route path='/paymentfail' element={<PaymentFail />} />
          {/* admin routes */}
          <Route path='/admin/dashboard' element={<ProtectedRoute adminRoute={true} 
          isAuthenticated={isAuthenticated}
          isAdmin={user && user.role === 'admin'}>
          <Dashboard />
          </ProtectedRoute>} />
          <Route path='/admin/createcourse' element={<ProtectedRoute adminRoute={true} 
          isAuthenticated={isAuthenticated}
          isAdmin={user && user.role === 'admin'} >
            <Createcourse />
          </ProtectedRoute>} />
          <Route path='/admin/courses' element={<ProtectedRoute adminRoute={true} 
          isAuthenticated={isAuthenticated}
          isAdmin={user && user.role === 'admin'}>
            <AdminCourses />
          </ProtectedRoute>} />
          <Route path='/admin/users' element={<ProtectedRoute adminRoute={true} 
          isAuthenticated={isAuthenticated}
          isAdmin={user && user.role === 'admin'}>
            <Users />
          </ProtectedRoute>} />
        </Routes>
        <Footer />
        <Toaster />
            </>
          )
        }
      </Router>
    </div>
  );
}

export default App;
