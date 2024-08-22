require('dotenv').config();
const jwt = require('jsonwebtoken');

//auth middleware
exports.auth = async (req, resp, next) => {
    try {
        //fetch the token from any 3 ways possible
        //most optimised is the header of the request
        const token = req.cookies.mycookie || req.body.token || req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return resp.status(401).json({
                success: false,
                message: 'authorization failed'
            })
        }
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //if token is valid then attach the user id to the request
        if (!decoded) {
            return resp.status(401).json({
                success: false,
                message: 'invalid token'
            })
        }
        req.user = decoded;//inserting the whole payload i have got from verify() into the user field of request object
        //now this object will traverse throgh the auth middlewares then route controller and all can access the user's data throgh this payload


        next();

        // HERE IF WE RETURN RESPONSE THEN CONTROLL WILL NOT GO FORWARD

        // resp.status(200).json({
        //     success: true,
        //     message: 'authentication successful'
        // })

        //passing the controll to the next middleware by calliing the next methoid provided by the mongoose 
        

    } catch (err) {
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}


//isStudent middleware
exports.isStudent = async (req, resp, next) => {
    try {
        const accountType = req.user.accountType;
        if (accountType === 'Student') {
            //call next if he is a student
            next();

            //IF WE RETURN RESPONSE THEN CONTROLL WILL NOT GO FOWARD
            // resp.status(200).json({
            //     success: true,
            //     message: 'welcome the the protected route for student'
            // })
        }
        else {
            return resp.status(401).json({
                success: false,
                message: 'unauthorized access... please login as a student'
            })
        }

    } catch (err) {
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

//isInstructor middleware
exports.isInstructor = async (req, resp, next) => {
    try {
        const accountType = req.user.accountType;
        if (accountType === 'Instructor') {

            next();

                        //IF WE RETURN RESPONSE THEN CONTROLL WILL NOT GO FOWARD
            // resp.status(200).json({
            //     success: true,
            //     message: 'welcome the the protected route for instructor'
            // })
        }
        else {
            return resp.status(401).json({
                success: false,
                message: 'unauthorized access... please login as an instructor'
            })
        }



    } catch (err) {
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

//isAdmin middleware
exports.isAdmin = async (req, resp, next) => {
    try {
        const accountType = req.user.accountType;
        if (accountType === 'Admin') {

            next();

                        //IF WE RETURN RESPONSE THEN CONTROLL WILL NOT GO FOWARD
            // resp.status(200).json({
            //     success: true,
            //     message: 'welcome the the protected route for admin'
            // })
        }
        else {
            return resp.status(401).json({
                success: false,
                message: 'unauthorized access... please login as an admin'
            })
        }

    } catch (err) {
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}