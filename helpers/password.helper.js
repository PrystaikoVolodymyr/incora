const bcrypt = require('bcrypt');
const ErrorHandler = require('../error/errorHandler');
const { statusCodes } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Bad email or password');
        }
    }
};
