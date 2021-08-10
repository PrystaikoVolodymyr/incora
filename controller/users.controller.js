const { userService, mailService } = require('../services');
const { statusCodes, emailActions } = require('../constants');
const { passwordHasher } = require('../helpers');
const ErrorHandler = require('../error/errorHandler');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            const hashPassword = await passwordHasher.hash(user.password);
            await userService.addUser({ ...user, password: hashPassword });

            res.json(`User ${user.first_name} is created`);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.findById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userUpdates = req.body;
            const { user } = req.tokensInfo;
            if (user._id.toString() !== userId) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'User is not login. Please login : http://localhost:5000/login');
            }
            await userService.updateUser(userId, userUpdates);
            const updatedUser = await userService.findById(userId);

            await mailService.senderMail(updatedUser.email, emailActions.UPDATE, updatedUser.first_name);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
