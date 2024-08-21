const mongoose = require('mongoose');
const { sendEmail } = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

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
    try {
        const mailresponse = await sendEmail(email, "verification email from StudyNotion", emailTemplate(otp));
		console.log("Email sent successfully: ", mailresponse.response);
    } catch (err) {
        console.error('error occured while calling the sendmail function :', err);
        return;
    }
}

OTPSchema.pre('save', async (next) => {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})

module.exports = mongoose.model('OTP', OTPSchema);