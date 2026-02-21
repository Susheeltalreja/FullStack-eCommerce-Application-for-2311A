const AuthModel = require("../Model/AuthModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const transport = require("../Mail/Config");

const dotenv = require("dotenv");
dotenv.config();

// ..Register User 
const RegisterUser = async (req, res) => {
    const { UserName, UserEmail, UserPassword } = req.body;
    try {
        if (!UserName || !UserEmail || !UserPassword) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const FindUser = await AuthModel.findOne({ UserEmail });
        if (FindUser) {
            return res.json({
                success: false,
                message: "User already registered"
            })
        }

        const HashPassword = await bcrypt.hash(UserPassword, 11);

        const CountDocument = await AuthModel.countDocuments();

        const DefineRole = CountDocument === 0 ? "admin" : "user";

        const GenerateOtp = Math.floor(1000 + Math.random() * 8999);

        const NewUser = new AuthModel({
            UserName,
            UserEmail,
            UserPassword: HashPassword,
            UserRole: DefineRole,
            UserOTP: GenerateOtp,
            OtpExpireTime: new Date(Date.now() + (3 * 60 * 1000))
        })

        await NewUser.save();

        transport.sendMail({
            from: process.env.MAIL_FROM,
            to: UserEmail,
            subject: "OTP Verification",
            text: `Your otp is: ${GenerateOtp}`
        })

        return res.status(200).json({
            success: true,
            message: "User register successfully | Otp transfer to your mail"
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}
// ..Login User 
const LoginUser = async (req, res) => {
    const { UserEmail, UserPassword } = req.body;
    try {
        if (!UserEmail || !UserPassword) {
            return res.json({
                success: false,
                message: 'All fields are required'
            })
        }
        const FindUser = await AuthModel.findOne({ UserEmail });
        if (!FindUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        if (FindUser.isVerified === "pending") {
            return res.json({
                success: false,
                message: "You are not verified"
            })
        }

        const MatchPassword = await bcrypt.compare(UserPassword, FindUser.UserPassword);
        if (!MatchPassword) {
            return res.json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const CreateToken = jwt.sign(
            {
                ID: FindUser?._id,
                Name: FindUser?.UserName,
                Email: FindUser?.UserEmail,
                Role: FindUser?.UserRole
            },
            "USER_SECRET_KEY",
            { expiresIn: "2h" }
        )
        return res.status(200).cookie("token", CreateToken, {
            httpOnly: true
        }).json({
            success: true,
            message: "Logged in successfully",
            User: {
                ID: FindUser?._id,
                Name: FindUser?.UserName,
                Email: FindUser?.UserEmail,
                Role: FindUser?.UserRole
            }
        })


    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

//Lougout user
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
}

//Otp verfication
const OtpVerfication = async (req, res) => {
    const { UserEmail, OTP } = req.body;
    try {
        if (!UserEmail || !OTP) {
            return res.json({
                success: false,
                message: "Invalid Data"
            })
        }

        const FindUser = await AuthModel.findOne({ UserEmail });
        if (!FindUser) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        if (FindUser.OtpExpireTime < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP Expired'
            })
        }
        if (FindUser.UserOTP.toString() !== OTP) {
            return res.json({
                success: false,
                message: "Invalid Otp"
            })
        }
        FindUser.UserOTP = 0;
        FindUser.OtpExpireTime = 0;
        FindUser.isVerified = "verified";
        await FindUser.save();
        transport.sendMail({
            from: process.env.MAIL_FROM,
            to: UserEmail,
            subject: "Welcome Message",
            text: "Welcome to our site"
        })
        return res.json({
            success: true,
            message: "Otp verified successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            success: false,
            message: "SERVER ISSUE"
        })
    }
}

//Regenerate OTP 
const RegenrateOTP = async (req, res) => {
    const { UserEmail } = req.body;
    try {
        if (!UserEmail) {
            return res.json({
                success: false,
                message: "Invalid data"
            })
        }
        const FindUser = await AuthModel.findOne({ UserEmail });
        if (!FindUser) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }
        if (FindUser.isVerified === "verified") {
            return res.json({
                success: false,
                message: "User already verified"
            })
        }

        FindUser.UserOTP = Math.floor(1000 + Math.random() * 8999);
        FindUser.OtpExpireTime = new Date(Date.now() + (3 * 60 * 1000));
        FindUser.isVerified = "pending";
        await FindUser.save();

        transport.sendMail({
            from: process.env.MAIL_FROM,
            to: UserEmail,
            subject: "Resend OTP",
            text: `Your new OTP is ${FindUser.UserOTP}`
        })

        return res.status(200).json({
            success: true,
            message: "Otp resended successfully"
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            success: false,
            message: "SERVER ISSUE"
        })
    }
}

//check user => send mail => FORGET password link
const CheckUser = async (req, res) => {
    try {
        const UserEmail = req.params.email;

        const FindUser = await AuthModel.findOne({UserEmail});

        if(!FindUser){
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        transport.sendMail({
            from: process.env.MAIL_FROM,
            to: UserEmail,
            subject: "Forget password Link",
            text : `http://localhost:5173/auth/forget-password/${UserEmail}`
        })

        return res.status(200).json({
            success: true,
            message: "Forget password link send to your mail"
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            success: false,
            message: "SERVER ISSUE"
        })
    }
}

//forget password
const forgetPassword = async(req, res) => {
    const {UserEmail, NewPassword, ConfirmPassword} = req.body;
    try{
        if(!UserEmail || !NewPassword || !ConfirmPassword){
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const FindUser = await AuthModel.findOne({UserEmail});
        if(!FindUser){
            return res.json({
                success: false,
                message: "User Not found"
            })
        }
        if(NewPassword !== ConfirmPassword){
            return res.json({
                success: false,
                message: "Both passwords should be same"
            })
        }

        const HashedPassword = await bcrypt.hash(NewPassword, 10);

        FindUser.UserPassword = HashedPassword;

        await FindUser.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })

    }catch(e){
        console.log(`Error: ${e}`);
        res.status(500).json({
            success: false,
            message: "SERVER ISSUE"
        })
    }
}
module.exports = { RegisterUser, LoginUser, logoutUser, OtpVerfication, RegenrateOTP, CheckUser, forgetPassword }