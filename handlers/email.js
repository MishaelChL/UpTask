const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");


let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
    },
});

//generar HTML
const generarHTML = () => {
    const html = pug.renderFile(`${__dirname}/../views/emails/reestablecerPassword.pug`);
    return juice(html);
}

let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>',
    to: "jose.mishael.chile@gmail.com",
    subject: "Password Reset",
    text: "Hello",
    html: generarHTML(),
};

transport.sendMail(mailOptions);