/*const   User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req,res)=>{
    try{
        const {name ,email ,password }= req.body;
        
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        await User.create({name,email,password});
     res.json({message :"User registered successfully"});
    }catch(error){
        console.error(error.message);
        res.status(500).json({error :error.message});
    }
};



exports.login = async (req,res)=>{
    try{
        const {email ,password} = req.body;
        let user = await User.findOne({email});
        if(!user){return res.status(400).json({message :"Invalid credentials"});}
        const isMatch = await bcrypt.compare(password ,user.password);
        if(!isMatch){
            return res.status(400).json({message :"invalid credentials"});
        }
        const token = jwt.sign(
            {id :user._id},
            process.env.JWT_SECRET,
            {expiresIn :'7d'}
        );
        res.json({token});
    }catch(error){
        console.error(error.message);
        res.status(500).json({error :error.message});
    }
};*/

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();   

        res.json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({ token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
};

