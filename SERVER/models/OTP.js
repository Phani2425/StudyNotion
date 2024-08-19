const mongoose = require('mongoose');
const {sendEmail} = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
})

//defining the function which will call the mailsender function before the data of generated otp is saved in the otp model
async function sendVerificationEmail(email,otp){
    try{
      const mailresponse = await sendEmail(email,"verification email from StudyNotion",otp);
      consoole.log(mailresponse);
    }catch(err){
        console.error('error occured while calling the sendmail function :', err);
        return;
    }
}

OTPSchema.pre('save', async(next) => {
  await sendVerificationEmail(this.email,this.otp);
  next();
})

module.exports = mongoose.model('OTP', OTPSchema);