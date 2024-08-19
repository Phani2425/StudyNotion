const nodemailer = require('nodemailer');
require('dotenv').config();

exports. sendEmail = async ({email, title, body}) => {
  try{
//2 step process

//1:- create transporter
const transporter = nodemailer.createTransporter({
    host:process.env.HOST,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS,
    }
});

//2.send email
let info = await transporter.sendMail({
    from: 'StudyNotion || Phani Bhusan Mohanty',
    to:`${email}`,
    subject:`${title}`,
    html:`${body}`,
});

console.log(info);
return info;

  }catch(err){
    console.error('error occured while sending email :', err);
    throw new Error('Failed to send email');
  }
} 