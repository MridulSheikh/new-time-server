const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMail = async (data) => {
  const accessToken = await oAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_MAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(process.cwd(), "views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(process.cwd(), "views"),
      extName: ".handlebars",
    })
  );
  let info = await transporter.sendMail(data);

  return info.messageId;
};
