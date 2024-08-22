const mongoose = require('mongoose');
const { sendEmail } = require('../utils/mailSender');
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

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
		expires: 5 * 60, // The document will be automatically deleted after 5 minutes of its creation time
    }
})

//defining the function which will call the mailsender function before the data of generated otp is saved in the otp model
async function sendVerificationEmail(email, otp) {
    console.log('inside sendVerificationEmail');
    try {
        const mailresponse = await sendEmail(email, "verification email from StudyNotion", otpTemplate(otp));
		console.log("Email sent successfully: ", mailresponse.response);
    } catch (err) {
        console.error('error occured while calling the sendmail function :', err);
        return;
    }
}

//i was using arraow function and i was getting this.email and this.otp as undefined
// The issue is that the this keyword inside the pre('save') hook is not referring to the document as you expect because of how arrow functions handle this. In JavaScript, arrow functions do not have their own this context but instead inherit it from the surrounding lexical context. In Mongoose hooks, you should use a regular function to correctly reference the document being saved.


//dont use arrow function here as in js arrow functionn donot have their own this they inherit that from surrounding 
//and we will use this here so we will use normal async function here instead of the arrow ones
OTPSchema.pre('save', async function (next) {

	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
        console.log("Sending verification email");
        // Send an email with the generated otp to the user
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})

module.exports = mongoose.model('OTP', OTPSchema);