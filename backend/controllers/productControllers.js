import ErrorHandler from "../middlewares/error.js";
import Product from "../models/productModel.js";
import apiFeatures from "../middlewares/apiFeatures.js";

// create prod --admin
export const createProduct = async (req, res, next) => {
  try {
    //belwo is for to check who created the product 
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
    const resultPerPage = 5;
    //in Productbhi de sakte hai and Product.find() bhi
    const apiFeature = new apiFeatures(Product, req.query).search().filter().pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
      sucess: true,
      products,
      productCount
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

//product review
export const productReview  = async(req,res,next)=>{ 
  
}