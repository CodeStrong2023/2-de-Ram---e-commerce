import User from '../models/user.model.js'; // Importación en estilo ES6

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findById(userId) {
        return await User.findById(userId);
    }

    async findAll() {
        return await User.find();
    }

    async update(userId, userData) {
        return await User.findByIdAndUpdate(userId, userData, { new: true });
    }

    async delete(userId) {
        // Borrado físico (si quisieras borrado lógico, ajustar esto)
        return await User.findByIdAndDelete(userId);
    }
}

const userRepository = new UserRepository();
export default userRepository;