const { emailActions } = require('../constants');

module.exports = {
    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'user is updated'
    }
};
