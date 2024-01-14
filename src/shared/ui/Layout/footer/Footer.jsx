import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="bg-[#523f1b] text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-semibold mb-2">
          Исследуйте еще больше удивительных книг!
        </div>
        <div className="text-lg text-gray-400 mb-4">
          Потому что чтение - это настоящее приключение.
        </div>
        <div className="mt-4">&copy; {new Date().getFullYear()} MyLibrary</div>
      </div>
    </footer>
  );
};

export default Footer;
