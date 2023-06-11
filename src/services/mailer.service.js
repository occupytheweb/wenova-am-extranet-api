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


const sendMail = (
  to,
  subject,
  text = "",
  html = ""
) => transporter().sendMail(
  {
    from: `${emailConnectionProperties.senderName} <${emailConnectionProperties.from}>`,
    to,
    subject,
    text,
    html,
  },
  (info) => {
    if (!info) {
      console.log(`[MAILER] mail sent to '${to}'`);
    } else {
      console.error(`[MAILER] failed to send email to '${to}'`, info);
    }
  }
);


module.exports = {
  transporter,
  sendMail,
};
