import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'jianofreomagtangob@gmail.com',
        pass: EMAIL_PASSWORD
    }
});