import { request, response } from "express";

import { NotFoundException } from "../exceptions/exceptions.js";
import { userService } from "../services/user.services.js";

export class UserController {
  async createUser(req = request, res = response, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req = request, res = response, next) {
    try {
      const user = await userService.getUserById(req.params.id);

      if (!user) throw new NotFoundException("User not found");

      res.json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req = request, res = response, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({ status: "ok", users });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req = request, res = response, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) throw new NotFoundException("User not found");
      res.json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req = request, res = response, next) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) throw new NotFoundException("User not found");
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();