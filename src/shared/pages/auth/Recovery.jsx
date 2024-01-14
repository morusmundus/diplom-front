import * as React from 'react';
import {useContext, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserService from "../../../API/UserService"
import Loader from "../../ui/loader/Loader";
import {AuthContext} from "../../context/globalContext";
import {useCookies} from 'react-cookie';
import {Link, useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import {Alert} from "@mui/material";
import Cookies from "js-cookie";
import {useGrabData} from "../../hooks/useGrabData";
import logo from '../../assets/favicon.png'
import {toast} from "react-toastify";

const validationSchema = yup.object({
  email: yup.string().email("Некорректный формат").required('Заполните поле'),
});

export default function Recovery() {
  const formik = useFormik({
    initialValues: {
      email: ''
    }, validationSchema: validationSchema, onSubmit: (values) => {
      sendData(values).catch((s) => {
        if (isError === 404) {
          toast.error('Почтовый ящик не найден.', {
            theme: "colored",
          });
        }
      })
    },
  });

  const router = useNavigate()

  const [sendData, isLoading, isError] = useGrabData(async (attrs) => {
    await UserService.recoveryPassword(attrs.email, attrs.password)
    toast.success('🦄 Новый пароль отправлен на почту', {
      theme: "colored",
    });
    router("/login")
  })

  return (

    <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
       <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        variant="contained"
        sx={{mt: 3, mb: 2}}
      >
         {!isLoading ? 'Восстановить' : <Loader/>}
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Вспомнили пароль?
        <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
          Войти
        </Link>
      </p>
    </form>
  );
}
