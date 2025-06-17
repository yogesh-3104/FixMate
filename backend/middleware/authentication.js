import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticate = async(req, res, next) => {
  try {
    const token= req.cookies?.token ||req.headers.authorization.split(' ')[1];
    
    if(!token){
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select('-password');  
    if(!user){
      return res.status(404).json({message:"User not found"})
    }  
    req.user = user;
    next();  
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  } 
}

const authorizeProvider = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - No user context" });
  }
    
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Access denied. Providers only." });
  }
  next();
};

export {authenticate,authorizeProvider}
