import nodemailer from 'nodemailer';
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from '../../env_config';


const nodemailer_email = NODEMAILER_EMAIL
const nodemailer_password = NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nodemailer_email,
        pass: nodemailer_password
    }
});

const sendEmailNodemailer = async (to: string, subject: string, body: any) => {
    try {
        const mailOptions = {
            from: `"Insyrge" <${nodemailer_email}>`,
            to,
            subject,
            html: body,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
};

export default sendEmailNodemailer;
