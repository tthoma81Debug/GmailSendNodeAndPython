require("dotenv").config();
require('https').globalAgent.options.rejectUnauthorized = false;
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      tls: {
        rejectUnauthorized: false
      }
    }
  });

  return transporter;
};


/*
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken: process.env.ACCESS_TOKEN,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      tls: {
        rejectUnauthorized: false
      }
    }
  });

  return transporter;
};

*/

const sendEmail = async (emailOptions) => {
    try{
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    }
    catch(Exception)
    {
        console.log("exception!")
        console.log(Exception)
    }
};


sendEmail({
  subject: "This is coming from node",
  text: "This is an example email from node",
  to: "example@example.com",
  from: process.env.EMAIL
});

