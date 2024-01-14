import React, {useMemo, useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useCart} from "../../context/CartContext";
import BookService from "../../../API/BookService";
import {useGrabData} from "../../hooks/useGrabData";
import BookCard from "./BookCard";
import Loader from "../loader/Loader";
import {Pagination} from "@mui/material";


const BookList = ({searchQuery, selectedFilter}) => {
  const [books, setBooks] = useState([]);
  const {addToCart} = useCart();
  const [selectedResults, setSelectedResults] = useState(10);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [loadBooks, isBookL] = useGrabData(async () => {
    const response = await BookService.getAllPages(selectedResults, currentPage - 1, searchQuery, selectedFilter);
    setTotalPages(getTotalPages(selectedResults, response.data.total))
    setBooks(response.data.books)
  })

  useMemo(() => {
    loadBooks()
  }, [currentPage, searchQuery, selectedResults, selectedFilter])

  const handleAddToCart = (bookId) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId && book.available) {
        addToCart(book); // Add the book to the cart
        const updatedCopies = book.availableCopies - 1;
        const updatedBook = {
          ...book,
          addedToCart: true,
          availableCopies: updatedCopies,
        };
        toast.success(`"${updatedBook.title}" добавлен в корзину.`, {
          position: toast.POSITION.TOP_CENTER, // Set the toast position
          autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
        });
        return updatedBook;
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const handleResultsChange = (event) => {
    setSelectedResults(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 py-12 m-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-4">
        Ознакомьтесь с нашей коллекцией
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Откройте для себя широкий спектр книг в нашей коллекции. Являетесь ли вы поклонником
        фантастики, драмы или другого определенного жанра, у нас есть
        что-то для каждого любителя книг.
      </p>

     <LimitSection selectedResults={selectedResults} handleResultsChange={handleResultsChange}/>

      {isBookL ? (
        <div>
          <Loader/>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {books.map(book =>
            <BookCard book={book} handleAddToCart={handleAddToCart} key={book.id}/>
          )}
        </div>
        )}
      <Pagination count={totalPages}
                  onChange={(e,page) => setCurrentPage(page)}
                  variant="outlined"
                  shape="rounded"
                  sx={{margin: "20px 0", display:"flex", justifyContent: "center"}}
      />
    </div>
  );
};

export default BookList;

function getTotalPages(limit, total) {
  return Math.ceil(total/limit);
}

const LimitSection = ({selectedResults, handleResultsChange}) => {
  return (
    <div className="mb-4">
      <label className="text-gray-600 font-semibold">
        Кол-во книг на странице:
      </label>
      <select
        className="ml-2 border rounded-lg px-2 py-1 pr-4 focus:outline-none focus:border-blue-500 shadow-sm text-gray-800"
        value={selectedResults}
        onChange={handleResultsChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  )
}