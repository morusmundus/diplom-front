import React from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useCart} from "../../context/CartContext";
import BookService from "../../../API/BookService";
import Button from "@mui/material/Button";
import {format} from "date-fns";

const Cart = () => {
  const {cartItems, removeFromCart, incQuantity, decQuantity, clearCart} = useCart();
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  const goToRentConfirmation = async () => {
    if (cartItems.length === 0) {
      toast.error("Ваша корзина пуста. Пожалуйста, добавьте книги.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } else {
      await BookService.addBooksToReceipt(cartItems)
      clearCart();
      toast.success(
        "Ура! 🎉 Оформлено. Приятного чтения!",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb]">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Корзина</h1>
        {cartItems.length === 0 ? (
          <div className="text-center mt-4">
            <h1 className="text-3xl text-gray-500">
              Упс! Ваша корзина пуста{" "}
              <span role="img" aria-label="Smiley face">
                😊
              </span>
            </h1>
            <p className="text-gray-500 mt-2">
              Здесь немного одиноко! Почему бы не начать добавлять несколько потрясающих книг
              в свою корзину? Хороших покупок!
            </p>

            <button
              onClick={() => goBack()}
              className="bg-[#46331f] hover:bg-[#bd8345] text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-10"
            >
              Назад
            </button>
          </div>
        ) : (
          <div className="flex flex-col	items-center">
            <div className="flex w-full items-center justify-center flex-wrap ">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 bg-white shadow-md h-72 m-2.5 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mb-4 relative transition-all duration-700 hover:scale-105"
                >
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="m-3">
                    <p className="text-gray-700">Автор: {item.authors.join(", ")}</p>
                    <p className="text-gray-700">Жанр: {item.genres.join(", ")}</p>
                    <p className="text-gray-700">Опубликовано: {format(new Date(item.published), 'dd/MM/yyyy') || "Не указано"}</p>
                    <div className="flex items-center justify-between mt-4">
                      <Button sx={{borderRadius: "50px"}} variant={"contained"} color={"primary"} onClick={() => decQuantity(item.id)}>-</Button>
                      <div className="text-gray-700">Количество: {item.quantity}</div>
                      <Button sx={{borderRadius: "50px"}} variant={"contained"} color={"primary"} onClick={() => incQuantity(item.id)}>+</Button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold py-2.5 px-10 rounded-md absolute bottom-5 left-1/2 transform -translate-x-1/2 border border-red-700"
                    >
                      Убрать
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-3/12  justify-center items-center mt-4 space-x-2">
              <button
                className="relative w-56 inline-flex items-center justify-center px-10 py-4 overflow-hidden text-white bg-[#46331f] rounded-lg group"
                onClick={clearCart}
                style={{whiteSpace: 'nowrap'}}
              >
                <span
                  className="absolute w-10 h-0 transition-all duration-500 ease-out bg-black rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
                <span className="relative w-fit">Удалить все</span>
              </button>
              <button
                onClick={goToRentConfirmation}
                className="relative w-56 inline-flex items-center justify-center px-10 py-4 overflow-hidden text-white bg-[#46331f] rounded-lg group"
              >
                <span
                  className="absolute w-10 h-0 transition-all duration-500 ease-out bg-black rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
                <span className="relative">Оформить</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
