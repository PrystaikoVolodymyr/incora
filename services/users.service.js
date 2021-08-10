const User = require('../dataBase/models/User');

module.exports = {
    addUser: async (user) => {
        await User.create(user);
    },
    findById: (userId) => User.findById(userId),
    updateUser: async (userId, userUpdates) => {
        await User.findByIdAndUpdate(userId, userUpdates);
    }
};
