import React from 'react';
import {useNavigate} from "react-router-dom";

const AuthMenu = () => {
  const router = useNavigate()

  return (
    <button
      className="text-white  border border-white hover:bg-[#ead9c6] hover:text-[#523f1b] font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
      onClick={() => router('/login')}
    >
      Войти
    </button>
  );
};

export default AuthMenu;