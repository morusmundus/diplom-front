import React from 'react';
import logo from "../../assets/favicon.png";
import Reg from "../../pages/auth/Reg";
import Recovery from "../../pages/auth/Recovery";
import Login from "../../pages/auth/Login";

const AuthLayout = ({path}) => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="w-24 h-24 mb-2" src={logo} alt="logo"/>
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {path === '/login' ? 'Авторизоваться' : ''}
              {path === '/reg' ? 'Зарегистрироваться' : ''}
              {path === '/recovery' ? 'Восстановить пароль' : ''}
            </h1>
            {path === '/login' ? <Login/> : ''}
            {path === '/reg' ? <Reg/> : ''}
            {path === '/recovery' ? <Recovery/> : ''}
          </div>
        </div>
      </div>
    </section>
  )
}
export default AuthLayout;