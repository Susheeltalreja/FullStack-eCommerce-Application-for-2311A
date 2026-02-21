
const jwt = require('jsonwebtoken');

const AdminMiddleware = async(req, res, next) => {
    const token = req?.cookies?.token;
    try{
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token not provided"
            })
        }
        try{
            const DecodedToken = jwt.verify(token, "USER_SECRET_KEY");
            if(DecodedToken.Role !== "admin"){
                return res.status(401).json({
                    succes: false,
                    message: "Un Authorized Person"
                })
            }
            next()
        }catch(e){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
    }catch(e){
        console.log(`Error: ${e}`);
        return res.status(500).json({
            message: "Server issue"
        })
    }
}

module.exports = {AdminMiddleware};