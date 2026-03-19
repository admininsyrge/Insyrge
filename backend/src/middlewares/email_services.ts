import path from "path";
import fs from 'fs';
import sendEmailNodemailer from "./nodemailerEmail"
import { config } from 'dotenv';
config();

const serviceProviderEmailVerification = async (data: any) => {
    try {
        let { email, security_code, first_name, last_name } = data
        let subject = 'Email Verification';
        let file_path = path.join(__dirname, '../email_templates/service_provider_email_varification.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%EMAIL%', email)
        html = html.replace('%FULL_NAME%', first_name + " " + last_name)
        html = html.replace('%SECURITY_CODE%', security_code)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const welcomeMail = async (data: any) => {
    try {
        let { email, first_name, last_name } = data
        const name = first_name + " " + last_name
        let subject = 'Freemium Freelance';
        let file_path = path.join(__dirname, '../email_templates/welcome_email.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%USER_NAME%', name ?? email)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const replyToUser = async (email: any,name:any,message:any) => {
    try {
        let subject = 'Thanks for your interest';
        let file_path = path.join(__dirname, '../email_templates/reply_to_user.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%EMAIL%', email)
        html = html.replace('%FULL_NAME%', name)
        html = html.replace('%MESSAGE%', message)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const UserEmailVerification = async (data: any) => {
    try {
        let { email, security_code, name } = data
        let subject = 'Email Verification';
        let file_path = path.join(__dirname, '../email_templates/user_email_varification.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%EMAIL%', email)
        html = html.replace('%FULL_NAME%', name)
        html = html.replace('%SECURITY_CODE%', security_code)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const userForgetPasswordMail = async (data: any) => {
    try {
        let { email, security_code, first_name, last_name } = data
        let subject = 'Forget Password';
        let file_path = path.join(__dirname, '../email_templates/forgot_password.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%USER_NAME%', first_name + " " + last_name)
        html = html.replace('%SECURITY_CODE%', security_code)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const providerForgetPasswordMail = async (data: any) => {
    try {
        let { email, security_code, first_name, last_name } = data
        let subject = 'Forget Password';
        let file_path = path.join(__dirname, '../email_templates/provider_forgot_password.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%USER_NAME%', first_name + " " + last_name)
        html = html.replace('%SECURITY_CODE%', security_code)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const adminForgetPasswordMail = async (data: any) => {
    try {
        let { email, security_code, first_name, last_name } = data
        let subject = 'Forget Password';
        let file_path = path.join(__dirname, '../email_templates/admin_forgot_password.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%USER_NAME%', first_name + " " + last_name)
        html = html.replace('%SECURITY_CODE%', security_code)
        await sendEmailNodemailer(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}

const contactUsEmail = async (data: any) => {
    try {
        let { first_name, last_name, email, contact_no, message } = data
        let subject = 'User try to contact you';
        let file_path = path.join(__dirname, '../email_templates/contact_us_email.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%FIRST_NAME%', first_name)
        html = html.replace('%LAST_NAME%', last_name)
        html = html.replace('%EMAIL%', email)
        html = html.replace('%MESSAGE%', message)
        html = html.replace('%CONTACT_NO%', contact_no)

        await sendEmailNodemailer(process.env.ADMIN_EMAIL, subject, html)
    }
    catch (err) {
        throw err;
    }
}


export {
    serviceProviderEmailVerification,
    UserEmailVerification,
    userForgetPasswordMail,
    providerForgetPasswordMail,
    adminForgetPasswordMail,
    contactUsEmail,
    welcomeMail,
    replyToUser
};