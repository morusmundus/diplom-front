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
  password: yup.string().required('Заполните поле'),
  password2: yup.string().required('Заполните поле')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});

export default function Reg() {
  const formik = useFormik({
    initialValues: {
      email: '', password: '', password2: ''
    }, validationSchema: validationSchema, onSubmit: (values) => {
      sendData(values).catch((s) => {
        const code = s.response.status
        if (code === 409) {
          toast.error('Почта уже используется.', {
            theme: "colored",
          });
        }
      })
    },
  });

  const router = useNavigate()

  const [sendData, isLoading, isError] = useGrabData(async (attrs) => {
    await UserService.registration(attrs.email, attrs.password)
    toast.success('🦄 Вы успешно зарегистрировались', {
      theme: "colored",
    })
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
      <TextField
        margin="normal"
        fullWidth
        name="password"
        type="password"
        label="Пароль"
        id="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password2"
        type="password"
        label="Повторите пароль"
        id="password2"
        autoComplete="current-password"
        value={formik.values.password2}
        onChange={formik.handleChange}
        error={formik.touched.password2 && Boolean(formik.errors.password2)}
        helperText={formik.touched.password2 && formik.errors.password2}
      />
      {!isLoading ? <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
      >
        Зарегистрироваться
      </Button> : <Loader/>}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Уже зарегистрированы?
        <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
          Войти
        </Link>
      </p>
    </form>
  );
}
