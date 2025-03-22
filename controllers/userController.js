const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const secretname = process.env.SECRET_KEY;

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const verifyEmail = await User.findOne({ email });

        if (verifyEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashpassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error in userRegister:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const securitytoken = jwt.sign({ userId: user._id }, secretname, { expiresIn: '1h' });
        return res.status(200).json({ message: "User login successful", securitytoken, userId: user._id });

    } catch (error) {
        console.error("Error in userLogin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


    const allUsers=async(req,res)=>{
    try {
        const user=await User.find().populate('renter');
        res.json(user);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"internal server error"})
    }
            
};

const userById=async(req,res)=>{

        const userId=req.params.id;
        try {
            
            const user=await User.findById(userId);
            
            if(!user){
                res.status(400).json({error:"user not found"})
            
            }
            res.status(200).json({user});
            console.log(user);
            
        } catch (error) {
                console.log(error);
                res.status(500).json({error:"internal server error"})
                
        }
};

module.exports = { userRegister, userLogin ,allUsers,userById};
