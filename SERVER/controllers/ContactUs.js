const { contactUsEmail } = require("../mail/templates/contactFormRes")
const sendEmail = require("../utils/mailSender")
require('dotenv').config();

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body);
  try {
    //first sending mail to the admin or myself
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail(adminEmail, `A contact message from ${firstname} having phoneNo ${phoneNo} from StudyNotion`, message );

    //then sending mail to the student
    const emailRes = await sendEmail(
      email,
      "Your message sent successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes.response)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}