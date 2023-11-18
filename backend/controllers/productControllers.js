import Product from "../models/productModel.js"



export const createProduct = async(req,res,next)=>{
    
    
    const product = await Product.create(req.body);
    
    res.status(201).json({ 
        succes:true,
        product
    })


}



export const getAllProduct  = (req,res)=>{ 
res.status(201).json({ 
    sucess:true,
    message:"all products"
})
}