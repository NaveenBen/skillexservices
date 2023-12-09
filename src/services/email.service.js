const config = require('../config/config');

const {Resend} =  require('resend');
const resend = new Resend(config.resend.apiKey);



const sendEmail = async (email, subject, text) => {
    try {
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'munna.naveen786@gmail.com',
            subject: subject,
            html: text,
            text: text,
          });
    } catch (error) {
        console.log("🚀 ~ file: email.service.js:5 ~ sendEmail ~ error:", error)
    }
};

module.exports = {
    sendEmail
}