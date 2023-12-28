import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
      default:"India",
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    name:{ 
      type:String,
    },
    ship:{ 
      type:Number
    },
    sumTotal:{ 
      type:Number
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      _id:{
        type:String,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      stock:{ 
        type:Number
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: String,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Order = mongoose.model("Order",orderSchema)

export default Order