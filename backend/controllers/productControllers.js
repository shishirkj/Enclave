import Product from "../models/productModel.js"


// create prod --admin
export const createProduct = async(req,res,next)=>{
  
    const product = await Product.create(req.body);
    
    res.status(201).json({ 
        succes:true,
        product
    })

}


//get all products
export const getAllProduct  = async(req,res,next)=>{ 

    const products = await Product.find();

res.status(200).json({ 
    sucess:true,
    products
})
}

export const getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if(!product){ 
        res.status(404).json({ 
            success:false,
            message:"product id not found"
        })
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  }

  

//upadte product --admin

export const updateProduct = async(req,res,next)=>{ 
    let product = await Product.findById(req.params.id);

    if(!product){ 
        res.status(404).json({ 
            success:false,
            message:"product id not found"
        })
    }

    //it wil work fine even if i dont put runValidators: true,useFindAndModify: false,
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({ 
        success:true,
        message:"updated",
        product
      })

}


//delete product --admin
export const deleteProduct = async(req,res,next)=>{ 
    let product = await Product.findById(req.params.id);
    
    if(!product){ 
        res.status(404).json({ 
            success:false,
            message:"product id not found"
        })
    }

    const {name} = product;
    await product.deleteOne();

    res.status(200).json({ 
        success:true,
        message: `${name} product is deleted `,

    })

}