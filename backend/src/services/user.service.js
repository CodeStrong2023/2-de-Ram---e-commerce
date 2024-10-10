import { NotFoundException } from "../exceptions/exceptions.js";
import { userRepository } from "../repositories/user.repository.js";
export class UserService {

    async getUserById(userId) {
        const user = await userRepository.findById(userId);
        if(!user) throw new NotFoundException('User not found');
        return 
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async updateUser(userId, userData) {
        const user = await userRepository.update(userId, userData);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async deleteUser(userId) {
        const user = await userRepository.delete(userId);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}


