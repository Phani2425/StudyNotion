const express = require('express');
const app = express();
require('dotenv').config();
const {connectToDatabase} = require('./config/database');
const Router = require('./routes/route');
const connectToCloudinary = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const fileUpload  = require('express-fileupload');

const PORT = process.env.PORT || 6000 ;
app.listen(PORT, ()=> {
    console.log(`server is listening at port number :- ${PORT}`);
})

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// connecting to the database and cloudinary services
connectToDatabase();
connectToCloudinary();

app.use('/api/v1', Router);
app.get('/', (req,resp) => {
    resp.send('welcome to our api for studynotion');
})