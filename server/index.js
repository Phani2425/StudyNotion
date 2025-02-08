const express = require('express');
const app = express();
require('dotenv').config();
const { connectToDatabase } = require('./config/database');
const { connectToCloudinary } = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const { verifySignature } = require('./controllers/StripePayment')


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server is listening at port number :- ${PORT}`);
})



app.use(cookieParser());
//remember this syntax (i used to forget this)
//we are passing useTempFiles:true because while uploading media to the cloudinary the uploader.upload() method takes tempFilePath of the file by :- fileName.tempFilePath

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
)
//as my forntend is hosted at localhost port 3000 currently and i want that by backend server shuld entertain the requests coming from my frontend or url:- localhost port 3000 ..... so i will use cors as middleware which enables my backend to entertain the requests coming from my frontend
app.use(
	cors({})
)

// connecting to the database and cloudinary services
connectToDatabase();
connectToCloudinary();

app.post('/api/v1/payment/verifysignature', express.raw({ type: 'application/json' }), verifySignature);


app.use(express.json());

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const paymentRoutes = require("./routes/Payments");

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use('/api/v1/payment', paymentRoutes);







app.get('/', (req, resp) => {
	resp.send('welcome to our api for studynotion');
})