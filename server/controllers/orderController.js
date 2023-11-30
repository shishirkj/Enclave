import Order from "../models/orderModel.js";
import ErrorHandler from "../middlewares/error.js";
import Product from "../models/productModel.js";




//create order

export const createOrder = async(req,res,next)=>{ 
    try {
        const{ shippingInfo,orderItems,paymentInfo, itemsPrice,taxPrice,shippingPrice,totalPrice,} = req.body


        const order = await Order.create({ shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,})
    
    
    
        res.status(201).json({ 
            success:true,
            order
    
        })
        
    } catch (error) {
        next(error)
    }


}


// get Single Order
export const getSingleOrder = async(req,res,next)=>{ 
try {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }

    res.status(200).json({ 
        success:true,
        order
    })
} catch (error) {
    next(error)
}
    
}



// get logged in user  Orders
export const myOrders = async(req,res,next)=>{ 
    try {
        console.log(req.user);
        const{_id} = req.user;
        console.log(_id);
        const orders =await Order.find({user:_id});

     res.status(200).json({ 
        success:true,
        orders
    })
        
    } catch (error) {
        next(error)
    } 
    
}


//get all orders --admin
export const getAllOrders = async(req,res,next)=>{ 
    try {
        const orders = await Order.find();

     //totalAmount by adding all the toalPrice property
        let totalAmount = 0;
        for (let i = 0; i < orders.length; i++) {
          totalAmount += orders[i].totalPrice;
        }
    
        res.status(200).json({ 
            success:true,
            orders,
            totalAmount
        })
    } catch (error) {
        next(error)
    }
   

}

//update orderStatus --admin
export const updateOrder = async(req,res,next)=>{ 
    try {
        
        
        const order = await Order.findById(req.params.id);
        if(!order) return next(new ErrorHandler("order not found",404));

        if(order.orderStatus ==='Delivered') return next(new ErrorHandler("You have already delivered this order", 400));
    
        if(req.body.status==='Shipped')
        { 
            order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
            });
        }
    
        order.orderStatus = req.body.status;
    
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
          }
        
          await order.save({ validateBeforeSave: false });
          res.status(200).json({
            success: true,
          });
    } catch (error) {
        next(error)
    }
  
}

export const updateStock = async(productId,quantity)=>{
  try {
    const product = await Product.findById(productId);

    product.Stock-=quantity;

    await product.save({ validateBeforeSave: false });
  } catch (error) {
    next(error)
  }
}


//delete Order --admin
export const deleteOrder =async (req,res,next)=>{

   try {
    const order  = await Order.findById(req.params.id);

    if(!order) return next(new ErrorHandler("order not found",404));

    await order.deleteOne();
    
     res.status(200).json({ 
        success:true,
    
     })
    
   } catch (error) {
    next(error)
   }
}