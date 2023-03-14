import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Register function
export const register = async(req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })


        await newUser.save();
        res.status(200).send("user has been created")

    } catch (error) {
        next(error)
    }
}


//login function 
export const login = async(req, res, next) => {

    try {

        const user = await User.findOne({username:req.body.username
        })
        if(!user){
            const error1 = new Error();
            error1.status = 404;
            error1.message = "User not found";

            return next(error1)
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordCorrect){
            const error2 = new Error();
            error2.status = 404;
            error2.message = "wrong password or username";

            return next(error2)
        }

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie('access_token', token).status(201).json({otherDetails})


    } catch (error) {
        next(error)
    }
}