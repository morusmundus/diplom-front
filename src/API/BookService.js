import AbstractService from "./AbstractService";

export default class BookService extends AbstractService {

  static async getAllPages(limit, page, query, filter) {
    return await AbstractService.getAll(limit, page, query, filter,"/books")
  }

  static async addBooksToReceipt(cartItems) {
    const itemsId = cartItems.map(i => {
      return {
        id: i.id,
        quantity: i.quantity
      }
    })
    return await AbstractService.post("/orders", itemsId)
  }

  static async findAllAuthors() {
    return await AbstractService.findAll("/authors")
  }

  static async addBook(body) {
    return await AbstractService.post("/librarian/books", body)
  }
}
