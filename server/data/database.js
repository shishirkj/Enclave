import mongoose from "mongoose"

const connectDB = ()=>{ 

        mongoose.connect(process.env.MONGO_URI).then((c)=>{ 
            console.log(`Database connected to ${c.connection.host}`)
        }).catch((error)=>{ 
            console.log(error)
        })

}

export default connectDB