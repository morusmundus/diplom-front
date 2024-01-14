import React from 'react';
import { format } from 'date-fns';


const BookCard = ({book, handleAddToCart}) => {
  return (
    <div>
      <div
        key={book.id}
        className="page-turn bg-[#ead9c6] border rounded-lg shadow-md p-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2" style={{width:"200px"}}>
          {book.title}
        </h2>
        {book.available ? (
          <p className="text-green-600 font-semibold mb-2">
            Доступно штук -{" "}
            <span className="font-semibold">
                    {book.availableCopies}{" "}
              {book.availableCopies === 1 ? "копии" : "копий"}
                  </span>
          </p>
        ) : (
          <p className="text-red-600 font-semibold mb-2">Нет в наличии</p>
        )}
        {book.url ?
          <img
            src={book.url}
            alt={book.title}
            className="w-full h-[230px] w-auto overflow-auto mb-2"
          />
          : <div className="w-full h-[230px] w-auto overflow-auto mb-2 flex items-center justify-center">Нет фото</div>
        }
        <div className="text-sm text-gray-600">
          <p className="mb-1">Автор: {book.authors.join(", ") || "Не указано"}</p>
          <p className="mb-1">Жанр: {book.genres.join(", ") || "Не указано"}</p>
          <p className="mb-1">Опубликовано: {format(new Date(book.published), 'dd/MM/yyyy') || "Не указано"}</p>
        </div>
        <div className="flex justify-end">
          {book.addedToCart ? (
            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full cursor-not-allowed"
              disabled
            >
              Добавлено
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(book.id)}
              className={`mt-2 ${
                book.available
                  ? "bg-[#46331f] hover:bg-[#bd8345]"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={!book.available}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;