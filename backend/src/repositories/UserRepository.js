const User = require('../models/User.js');

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
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserRepository();
