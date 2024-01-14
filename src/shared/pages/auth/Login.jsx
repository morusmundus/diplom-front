import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UserService from "../../../API/UserService"
import Loader from "../../ui/loader/Loader";
import {AuthContext} from "../../context/globalContext";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import Cookies from "js-cookie";
import {useGrabData} from "../../hooks/useGrabData";
import {toast} from "react-toastify";

const validationSchema = yup.object({
  email: yup.string().email("Некорректный формат").required('Заполните поле'),
  password: yup.string().required('Заполните поле')
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '', password: '',
    }, validationSchema: validationSchema, onSubmit: (values) => {
      sendData(values).catch((s) => {
        const code = s.response.status
        if (code === 403 || code === 404) {
          toast.error('🦄 Неверный логин/пароль!', {
            theme: "colored",
          });
        }
        if (code === 406) {
          toast.error('🦄 Аккаунт заблокирован!', {
            theme: "colored",
          });
        }
        if (code === 500) {
          toast.error('🦄 Произошла ошибка. Повторите позже.', {
            theme: "colored",
          });
        }
      })
    },
  });

  const {role, setRole} = useContext(AuthContext)
  const router = useNavigate()

  const [sendData, isLoading] = useGrabData(async (attrs) => {
    const response = await UserService.login(attrs.email, attrs.password)
    setRole(response.data.role)
    Cookies.set('role', response.data.role);
    Cookies.set('jwt', response.data.token);
    router("/")
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
      <div className="flex items-center justify-between">
        <Link to={"/recovery"}
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
          Забыли пароль?</Link>
      </div>
      {!isLoading ? <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
      >
        Войти
      </Button> : <Loader/>}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Нет аккаунта?
        <Link to={"/reg"} className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}
