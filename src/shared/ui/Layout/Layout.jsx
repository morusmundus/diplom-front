import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import PageContainer from "./container/PageContainer";
import {ToastContainer} from "react-toastify";

const defaultTheme = createTheme();

const Layout = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header/>
      <PageContainer>
        <Outlet/>
        <ToastContainer />
      </PageContainer>
      <Footer/>
    </ThemeProvider>
  );
};

export default Layout;