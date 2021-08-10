const jwt = require('jsonwebtoken');
const { ACCESS_KEY, REFRESH_KEY } = require('../congifs/config');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_KEY, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, REFRESH_KEY, { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};
