import AbstractService from "./AbstractService";
import axios from "axios";

export default class UserService extends AbstractService {

  static async login(email, password) {
    return await AbstractService.post("/login", {
      email, password
    });
  }

  static async registration(email, password) {
    return await AbstractService.post("/registration", {
      email,
      password
    });
  }

  static async recoveryPassword(email) {
    return await AbstractService.post(`/recovery?email=${email}`)
  }

  static async logout() {
    return await AbstractService.post("/logout");
  }

  static async findAll() {
    return await AbstractService.findAll("/users");
  }

  static async changeParams(userId, role, isBlocked) {
    console.log(userId, role, isBlocked)
    return await AbstractService.put("/users", {
      id: userId,
      role: role,
      isBlocked: isBlocked
    });
  }
}