const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : 'testsayafikri@gmail.com',
        pass : 'sqbkbhfyxjudwbjb'
    },
    tls : {
        rejectUnauthorized : false
    }
})

module.exports = transporter
