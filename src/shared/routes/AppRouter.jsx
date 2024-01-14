import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "../context/globalContext";
import Error from "../pages/errors/Error";
import Layout from "../ui/Layout/Layout";
import Cart from "../ui/Cart/Cart";
import AuthLayout from "../ui/auth/AuthLaout";
import Main from "../pages/_main/Main";
import Analytics from "../pages/chart/Chart";
import UserManagement from "../pages/management/UserManagements";
import NewBookForm from "../pages/new-book/NewBookForm";

const AppRouter = () => {
  let {role, setRole} = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<AuthLayout path={"/login"}/>}/>,
        <Route path="/reg" element={<AuthLayout path={"/reg"}/>}/>,
        <Route path="/recovery" element={<AuthLayout path={"/recovery"}/>}/>,
        {/*{role === 'USER' ? <PrivateUserRoutes/> : ''}*/}
        {role === 'LIBRARIAN' ?
          <>
            <Route path="/analytics" element={<Analytics/>}/>,
            <Route path="/management" element={<UserManagement/>}/>,
            <Route path="/book-form" element={<NewBookForm/>}/>,
          </>
          : ''}
        <Route path="/404" element={<Error errorCode={404}/>}/>
        <Route path="*" element={<Navigate to={"/404"}/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;
