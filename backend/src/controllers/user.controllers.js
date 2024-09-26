import { request, response } from "express";
import { UserService } from "../services/UserService.js";

export class UserController {
  constructor() { 
    this.userService = new UserService();
  }

  createUser = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  getUserById = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  getAllUsers = async (req = request, res = response, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  updateUser = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  deleteUser = async (req = request, res = response, next) => {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}