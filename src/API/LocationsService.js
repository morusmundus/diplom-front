import AbstractService from "./AbstractService";

export default class LocationsService extends AbstractService {

  static async getAll() {
    return await AbstractService.findAll("/vacancies")
  }
}
