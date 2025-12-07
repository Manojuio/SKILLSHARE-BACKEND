const User = require("../models/user.model");

exports.getProfile = async (req,res)=>{
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
}
exports.updateProfile = async (req,res)=>{
    const updates =req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        {new :true}
    ).select("-password");
    res.json(user);
};

exports.deleteProfile = async (req,res)=>{
    const user = await User.findByIdAndDelete(req.user.id);
    res.json(user);
    res.json({message :"User deleted successfully"});
}