import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD, EMAIL_USER } from './env.js'

export const accountEmail = 'javascriptmastery00@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD
  }
})

export default transporter;