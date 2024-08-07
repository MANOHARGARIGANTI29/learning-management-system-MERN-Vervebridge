import {createTransport} from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail=async(to,subject,text)=>{
     const transporter = createTransport(
        {
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            auth: {
              user: process.env.SMPT_USER,
              pass: process.env.SMPT_PASS,
            }
        }
     );
     await transporter.sendMail({
        to,subject,text,
     })
}