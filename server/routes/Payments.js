// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayments, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payment")

const { auth, isStudent } = require("../middlewares/auth");

const { startPayment } = require("../controllers/StripePayment");

// ********************************************************************************************************controllers**********************************
router.post("/capturePayment", auth, isStudent, capturePayments);
router.post("/verifyPayment",auth, isStudent, verifyPayment)

router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

router.post('/create-checkout-session', startPayment);


module.exports = router;