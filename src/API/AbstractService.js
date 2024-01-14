import axios from "axios";
import Cookies from "js-cookie";

function checkJWTInCookie(token) {
  return token ? "Bearer " + token : '';
}

export default class AbstractService {
  static serverUrl = "http://localhost:8080"
  static jwtToken = checkJWTInCookie(Cookies.get("jwt"));

  static async getAll(limit = 10, page = 1, query = "", filterId = "",  uri) {
    console.log(limit, page, query, filterId)
    const endPoint = AbstractService.serverUrl + uri + `?limit=${limit}&needPage=${page}` +
      (query ? `&query=${query}` : '' ) +
      (filterId ?`&filter=${filterId}`: '')
    return await axios.get(endPoint, {
      headers: {
        "Authorization": this.jwtToken,
      }
    })
  }

  static async findAll(uri) {
    console.log(uri)
    const response = await axios.get(AbstractService.serverUrl + uri, {
      headers: {
        "Authorization": this.jwtToken,
      }
    });
    return response.data
  }

  static async post(uri, object) {
    console.log(uri)
    console.log(JSON.stringify(object))
    console.log(this.jwtToken)
    return await axios.post(AbstractService.serverUrl + uri, JSON.stringify(object), {
      headers: {
        "Authorization": this.jwtToken,
        'content-type': 'application/json',
        'charset': 'utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  static async put(uri, object) {
    console.log(JSON.stringify(object))
    return await axios.put(AbstractService.serverUrl + uri, JSON.stringify(object), {
      headers: {
        "Authorization": this.jwtToken,
        'content-type': 'application/json',
        'charset': 'utf-8'
      }
    });
  }

  static async get(uri) {
    console.log(AbstractService.serverUrl + uri)
    console.log(this.jwtToken)
    return await axios.get(AbstractService.serverUrl + uri, {
      headers: {
        "Authorization": this.jwtToken,
      }
    });
  }


}
