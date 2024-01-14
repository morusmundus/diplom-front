import AbstractService from "./AbstractService";

export default class ChartService extends AbstractService {

  static async getPieDataRatioByCategories() {
    return await AbstractService.get("/librarian/statistics/categories-fraction")
  }

  static async getPurchaseCountLastDays(days) {
    return await AbstractService.get(`/librarian/statistics/purchases?days=${days}`)
  }
}
