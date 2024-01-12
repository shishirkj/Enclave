import ErrorHandler from "../middlewares/error.js";
import Product from "../models/productModel.js";
import apiFeatures from "../middlewares/apiFeatures.js";

// create prod --admin
export const createProduct = async (req, res, next) => {
  try {
    //below we r using req.user.id to check who created the product 
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      succes: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//get all products
export const getAllProduct = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments();
    const resultPerPage = 7;
    //in Productbhi de sakte hai and Product.find() bhi
    const apiFeature = new apiFeatures(Product, req.query).search()
    apiFeature.pagination(resultPerPage)

    apiFeature.filter()

    const products = await apiFeature.query;


    res.status(200).json({
      sucess: true,
      products,
      productCount,
      resultPerPage
    });
  } catch (error) {
    next(error);
  }
};


//product detail
export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("product not found", 404));

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//upadte product --admin

export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("product not found", 404));

    //it wil work fine even if i dont put runValidators: true,useFindAndModify: false,
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "updated",
      product,
    });
  } catch (error) {
    next(error);
  }
};

//delete product --admin
export const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("product id not found", 404));

    const { name } = product;
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: `${name} product is deleted `,
    });
  } catch (error) {
    next(error);
  }
};

//create and update product review
export const createAndUpdateProductReview  = async(req,res,next)=>{ 
  try {
    const {prodId,comment,rating} = req.body;

    const product = await Product.findById(prodId);


    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const review = { 
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment
    }
  //find() returns the value of the first element in an array that passes a test
 
    //check if the person has already reviewd of that product
    let isReviewed =false;
  
  
    //we could use .find method but not working as isReviewed is coming undefined 
    for(let i =0;i<product.reviews.length;i++)
    { 
      if(product.reviews[i].user.toString()===req.user._id.toString())
      {
        isReviewed=true;
      }
      
    }
  
  
    //if true UPDATE REVIEW
    if(isReviewed)
    { 
      for(let i =0;i<product.reviews.length;i++)
      {
         //updating the rating and comment by finding the user in reviews array and upadting its review
         if(product.reviews[i].user.toString()===req.user._id.toString())
      { 
       
          product.reviews[i].rating = req.body.rating;
          product.reviews[i].comment = req.body.comment;
      }
    }
    }
  
    //FOR NEW REVIEW
    else{ 
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let sum =0;
    //to find average we can use reduce method to find sum but this easy
    for(let i =0;i<product.reviews.length;i++)
    { 
      sum += product.reviews[i].rating;
  
    };
  
    let avg = sum / product.reviews.length;
  
    //in product there are two ratings one whih is average and one for to each user to give rating of that product(below is second outer one)
    
    if (product.reviews.length === 0){ product.reviews.ratings = 0;}
    else{
     avg = sum / product.reviews.length;
  product.ratings = avg;
    }
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({ 
      succes:true,
    })
  } catch (error) {
    next(error)
  }
 
}


//get all reviews of a single product
export const getAllreviews = async(req,res,next)=>{ 
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    next(error)
  }
 
}



//delete review --admin

export const deleteReviews = async(req,res,next)=>{ 
  try {
    const product = await Product.findById(req.query.prodId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    //deleting by _id and not user
   const reviews= product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
  
  
  
  const numOfReviews = reviews.length
  
  
  
  let ratings = 0;
  
  if (product.reviews.length === 0) {
    ratings = 0;
  } else {
    let sum = 0;
  
   
    for (let i = 0; i < product.reviews.length; i++) {
      sum += product.reviews[i].rating;
    }
  
    let avg = sum / product.reviews.length;
    ratings = avg;
  }
  
  
    //updating the reviews array and numOfReviews and Ratings after delete
  
      await Product.findByIdAndUpdate(req.query.prodId,{reviews,numOfReviews,ratings},   {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })
  
      res.status(200).json({
        success: true,
      });
  } catch (error) {
    next(error)
  }


}