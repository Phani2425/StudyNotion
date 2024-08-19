const Section = require('../models/Section');
const Course = require('../models/Course');


//controller for creation of a section
exports.CreateSection = async (req, resp) => {
    try {
        //fetch data from request body
        //here interesting part is we will also recieve the course id in req as it is required to update the course with the newly created section
        const { sectionName, courseId } = req.body;
        //validate the data
        if (!sectionName || !courseId) {
            return resp.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        //make db entry in section model
        const SectionObj = new Section({ sectionName });
        const newSection = await SectionObj.save();
        //make db entry in course model by using the course id

        //First Parameter (courseId): Should be the courseId directly, not an object. findByIdAndUpdate expects the first argument to be the ID, not an object.
        const course = await Course.findByIdAndUpdate( courseId , { $push: { courseContent: newSection._id } }, { new: true }).populate({path:'courseContent',populate:{path:'subSection'}}).exec();
        //HW:- in course object populate both section and subsection basically use nested populate
        //ans:- Yes, specifying the path is necessary when using the populate method in Mongoose, especially when dealing with nested populations. The path tells Mongoose which field in the document should be populated with documents from another collection.
        // Example:
        // When you do .populate('courseContent'), Mongoose knows to replace the courseContent field with the documents from the referenced collection.
        // When you're doing nested population (like populating subSection within courseContent), you need to specify the path for subSection so that Mongoose knows which field within courseContent to populate.
        // Without path:
        // If you omit the path, Mongoose won't know which field you're trying to populate, and it will result in an error.

        console.log('updated course : ',course);

        //return response
        return resp.status(200).json({
            success: true,
            message: 'new section created successfully',
            data: newSection,
            course: course,
        })

    } catch (err) {
        console.log('error occuered during creating a section: ' + err.message);
        conssole.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message,
        })
    }
}

//controller for updating a section
//abhi to bas ham create karne ke wakt section ka naam le rahe hein aur kuch nehi to update bhi to wohi kar sakenge
//aur ek baat socho ki section ka naam update karne pe kya mujhe course me jake kuch change karna pdega???
//bilkull nehi kyuki course me to section ki id padi hogi bas aur naam change karne pe bhi us section ka id to same hi rahegi
exports. updateSection = async (req, resp) => {
    try{
        //data fetch(name)
        const {sectionName, sectionId} = req.body;
        //validate
        if(!sectionName ||!sectionId){
            return resp.status(403).json({
                success: false,
                message:'all fields are required'
            })
        }
        //make db update
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        //return response
        return resp.status(200).json({
            success: true,
            message:'section updated successfully',
            data: updatedSection
        })
    }catch(err){
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}

//controller for deleting a section
 exports. deleteSection = async(req, resp) => {
    try{
        //fetch data (assuming data is sent in params)(we can pass in multiple ways so just trying this way out to learn this) 
        const {sectionId} = req.params;
        //validate
        if(!sectionId){
            return resp.status(403).json({
                success: false,
                message:'all fields are required'
            })
        }
        //check that esa koi section hai bhi ke nehi(extra validation for testing in postman ..ye na hone se bhi chalega)
        const existingSection = await Section.findById(sectionId);
        if(!existingSection){
            return resp.status(404).json({
                success: false,
                message:'section not found'
            })
        }

        // TODO :---> DO WE ACTUALLY NEED TO DELETE SECTION ID FROM COURSE SCHEMA???? OR IT GETS DELETED AUTOMATICALLY WHEN WE DELETE THE SECTION??? [MEANS DOES WHEN WE DELETE A DATA OBJECT THEN DOES REFERENCE TO THAT DATA OBJECT FROM OTHER SCHMA GET DELETED AUTOMATICALLY????] {VERY VERY IMPORTANT} {YE HAM TESTING KE WAKT DEKHENGE}

        // //phir courseId ke madad se course me jake courseContent me se ye wala section id ko pop kardo
        // const updatedCourse = await Course.findByIdAndUpdate(courseId, {$pull : {courseContent : sectionId}}, {new:true}).populate({path: 'courseContent', populate : {path : 'subSection'}}).exec();
        // console.log('updated course : ', updatedCourse);

        //THERE ARE $push and $pull operator [i forgot that i thought it was pop]
        
        //phir section delete kardo
        const deletedSection = await Section.findByIdAndDelete(sectionId);
        //return response
        return resp.status(200).json({
            success: true,
            message:'section deleted successfully',
            data: deletedSection,
            course: updatedCourse
        })

    }catch(err){
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
 }