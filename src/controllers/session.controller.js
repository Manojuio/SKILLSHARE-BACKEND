const Session = require("../models/session.model");


exports.requestSession =async (req,res)=>{
    try{
        const requester = req.user.id;
        const mentor = req.params.mentorid;

        const session = await Session.create({
            requester,
            mentor,
            status :"pending"
        });
        res.json(session);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
    };

exports.acceptSession = async (req,res)=>{
  const session = await Session.findById(req.params.id) ;
  if (session.mentor.toString()!==req.user.id) {
    return res.status(403).json({msg :" Not authorized" });
  }
  session.status ="accepted";
    await session.save();
    res.json(session);
};

exports.rejectSession = async (req,res) => {
    const session = await Session.findById(req.params.id) ;
    if (session.mentor.toString()!==req.user.id) {
      return res.status(403).json({msg :" Not authorized" });
    }
    session.status ="rejected";
    await session.save();
    res.json(session);
}


exports.cancelSession = async (req,res) => {
   const session = await Session.findById(req.params.id) ;
   if (session.requester.toString()!==req.user.id) {
     return res.status(403).json({msg :" Not authorized" });
   }
   session.status ="cancelled";
   await session.save();
   res.json(session);
}

exports.getmyrequests = async (req,res) => {
    const sessions = await Session.find({requester : req.user.id});
    res.json(sessions);
}
 
exports.getmysessions = async (req,res) => {
    const sessions = await Session.find({mentor : req.user.id});
    res.json(sessions);
}