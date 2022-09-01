const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req,res,next) =>{
   try {
        const {token} = req.cookies;

        if(!token)
        {
            return res.status(401).json({
                message:"Please Login First"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userWallet = decoded;
        next();

   } catch (error) {
       res.status(500).json({
           success:false,
           message:error.message
       })
   }
}