const { Resend } = require('resend');
const config = require('../../config/config');

const resend = new Resend(config.resend.apiKey);

const sendEmail = async (email, subject, text) => {
  try {
  let x = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "happydonorsngo@gmail.com",
      subject,
      html: text,
      text,
    });
    return x;
  } catch (error) {
    console.log('🚀 ~ file: email.service.js:5 ~ sendEmail ~ error:', error);
  }
};

module.exports = sendEmail;