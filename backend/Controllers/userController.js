import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (req, res) => {
  const {name,email,password,role,location,phone,skills,experience,availability} = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      location,
      phone,
      skills,
      experience,
      availability,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(newUser);
    
    res.cookie("token", token);

    res.status(201).json({ result:newUser, token });
  } catch (error) {
    console.log("Register Error: ",error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token);

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    
    console.log("Error while Login: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  // const { id } = req.params;
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error while fetching user : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  // const { id } = req.params;
  const { id } = req.user;
  const {name,email,password,role,location,phone,skills,experience,availability,} = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {name,email,password,role,location,phone,skills,experience,availability},
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error while deleting user : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const getAllProvider = async(req,res)=>{
  try {
    const allProvider=await User.find({role:"provider"});
    console.log(allProvider);
    return res.status(200).json({message:"All provider fetched Successfully",allProvider})
  } catch (error) {
    console.log("Error while fetching all provider : ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export { register, login, getUser, updateUser, deleteUser,getAllProvider };
