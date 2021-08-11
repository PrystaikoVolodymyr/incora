const jwt = require('jsonwebtoken');
const { constant, statusCodes } = require('../constants');
const ErrorHandler = require('../error/errorHandler');
const O_Auth = require('../dataBase/models/O_Auth');

module.exports = {
    checkIsTokenValid: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION);
            if (!access_token) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'Token is not found');
            }
            const tokens = await O_Auth.findOne({ access_token });
            if (!tokens) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'Token is not found');
            }

            await jwt.verify(access_token, 'INCORA_ACCESS', (err) => {
                if (err) {
                    throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Token is not valid');
                }
            });

            req.tokensInfo = tokens;
            await next();
        } catch (e) {
            next(e);
        }
    }
};
