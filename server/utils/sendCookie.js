import jwt from "jsonwebtoken"

const sendCookie = (user,res,statusCode,message)=>{ 

    const token = jwt.sign({id:user._id},process.env.JWT);

    res.status(statusCode).cookie("token",token,{ 
        httpOnly:true,
        maxAge:7*60*1000*24,
        secure: true, // Set to true if using HTTPS
        sameSite: 'none',
    }).json({ 
        user,
        succes:true,
        message:message,
        token

     })

    
}


export default sendCookie