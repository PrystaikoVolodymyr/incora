const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');

const { ROOT_EMAIL, ROOT_PASSWORD } = require('../congifs/config');
const { statusCodes } = require('../constants');
const templatesInfo = require('../email-templates');
const ErrorHandler = require('../error/errorHandler');

const templatesParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_PASSWORD
    }
});

const senderMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];
        if (!templateInfo) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Wrong mail actions');
        }
        const html = await templatesParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'Volodymyr',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    senderMail
};
