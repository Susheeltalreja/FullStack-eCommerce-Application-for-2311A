
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_APP_PASSWORD
    }
})

module.exports = transport;