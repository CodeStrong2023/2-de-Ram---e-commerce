import userRepository from '../repositories/user.repository.js';

export default  class UserService {
    async registerUser(userData) {
        try {
            return await userRepository.create(userData);
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await userRepository.findById(id);
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw new Error(`Error retrieving user: ${error.message}`);
        }
    }

    async getAllUsers() {
        try {
            return await userRepository.findAll();
        } catch (error) {
            throw new Error(`Error retrieving users: ${error.message}`);
        }
    }

    async updateUser(id, updateData) {
        try {
            return await userRepository.update(id, updateData);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            return await userRepository.delete(id);  // Borrado lógico
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}


