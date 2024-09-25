

class UserService {
    async createUser(userData) {
        // Aquí puedes agregar lógica como encriptación de contraseñas o validaciones adicionales
        return await userRepository.create(userData);
    }

    async getUserById(userId) {
        return await userRepository.findById(userId);
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async updateUser(userId, userData) {
        return await userRepository.update(userId, userData);
    }

    async deleteUser(userId) {
        return await userRepository.delete(userId);
    }
}


