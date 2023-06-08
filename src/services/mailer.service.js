const nodemailer = require("nodemailer");
const { emailConnectionProperties } = require("../config");

const transporter = () => nodemailer.createTransport(
  {
    host:   "smtp.gmail.com",
    port:   465,
    secure: true,
    auth:   {
      type:          "OAuth2",
      user:          emailConnectionProperties.from,
      serviceClient: emailConnectionProperties.clientId,
      privateKey:    emailConnectionProperties.privateKey,
    },
  }
);


module.exports = transporter;
