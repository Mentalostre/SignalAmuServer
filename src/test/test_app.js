import nodemailer from 'nodemailer';
import {google} from 'googleapis';

// These id's and secrets should come from .env file.
const CLIENT_ID = '374997070095-0i75qkdrei1844dpocqe8fcsol8radsc.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04JpHwgJFe4e7CgYIARAAGAQSNwF-L9Irogparpq4WgT0ciaZGYvI2OUr3w1PzkypQD90twKJIjdeN3jAobasoHJseaDtpw7PV08';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'signalamu@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'SIGNAL\'AMU <signalamu@gmail.com>',
            to: 'john13011@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));

