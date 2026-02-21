const jwt = require('jsonwebtoken');

const AuthMiddleWare = async (req, res, next) => {
    const getToken = req?.cookies?.token;
    if (!getToken) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized person"
        })
    }
    try {
        const DecodeTheToken = jwt.verify(getToken,"USER_SECRET_KEY");
        req.User = DecodeTheToken;
        next();
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = {AuthMiddleWare};