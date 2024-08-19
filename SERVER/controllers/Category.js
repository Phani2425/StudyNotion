//importing required model
const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//this is a protected route which only can be accessed by admin as only admin can create a Category and the instructor will choose any predefined Category for his course

exports. CreateCategory = async (req,resp) => {
  try{
     //fetch data
     const {name,description} = req.body;
     //validate
     if(!name || !description){
      return resp.status(403).json({
        success:false,
        message:"all fields are required",
      })
     }
     //make db entry
     const newCategory = new Category({
      name,
      description
     });
     const response = await newCategory.save();
    //  return response 
    return resp.status(201).json({
      success: true,
      message:'new Category created successfully',
      data: response
    })
  }catch(err){
    console.log('error occured during creating a new Category',err.message);
    console.error(err.message);
    console.error(err.message);
    resp.status(500).json({
      success: false,
      message: 'internal server error',
      error: err.message
    })
  }
}

//controller for fetching all Categorys
exports.GetAllCategories = async (req,resp) => {
  try{
    const Categories = await Category.find({},{
      name:true,
      description:true
    });
    return resp.status(200).json({
      success: true,
      message:'all Categories fetched successfully',
      data: Categories
    })
  }catch(err){
    console.log('error occured during fetching all Categories',err.message);
    console.error(err.message);
    resp.status(500).json({
      success: false,
      message: 'internal server error',
      error: err.message
    })
  }
}



//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec()

    //console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec()
      //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}