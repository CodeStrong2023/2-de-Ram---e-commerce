import { request, response } from "express";
import { NotFoundException } from "../exceptions/exceptions.js";
import { UserService } from "../services/user.service.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);

      if (!user) throw new NotFoundException("User not found");

      res.json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req = request, res = response, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ status: "ok", users });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) throw new NotFoundException("User not found");
      res.json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) throw new NotFoundException("User not found");
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
