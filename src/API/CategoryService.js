import AbstractService from "./AbstractService";

export default class CategoryService extends AbstractService {

  static async getAllGenres() {
    return await AbstractService.findAll(`/genres`)
  }

}