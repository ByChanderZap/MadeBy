const nodemailer = require('nodemailer');
const { config } = require('../config/index');

const send = async (mail, subject, content) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.mail_username,
            pass: config.mail_password
        }
    });

    let mailOptions = {
        from: "no-replay@madeby.com",
        to: mail,
        subject: subject,
        html: content
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(info);
}

module.exports = {
    send
}