const { userValidator } = require('../validators');
const { statusCodes } = require('../constants');
const ErrorHandler = require('../error/errorHandler');
const User = require('../dataBase/models/User');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { error } = await userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }
            if (await User.findOne({ email })) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'User with this email is already created');
            }
            await next();
        } catch (e) {
            next(e);
        }
    },
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            if (userId.length != 24) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Not valid user Id');
            }
            await next();
        } catch (e) {
            next(e);
        }
    }
};
