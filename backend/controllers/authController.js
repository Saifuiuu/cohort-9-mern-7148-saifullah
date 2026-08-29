import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";

export const genToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const signup = async (req, res) => {
  try {
    console.log("function called")
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are Required!" });
    }

    if(password.length<8){
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const findUser = await User.findOne({ email: email.toLowerCase() });

    if (findUser) {
      return res.status(400).json({ message: "User already registerd" });
    }

    const user = await User.create({ name, email, password });

    const token =genToken(user._id);

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"strict",
      maxAge:7*24*60*60*1000,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    logger.info(`New User created id: ${user._id}`);
  } catch (error) {
    res.status(500).json("Server error while signup :", error);
    logger.error(`Singup error ${error}`);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }


    const user = await User.findOne({ email: email.toLowerCase() });

  if(!user){
  return res.status(401).json({ message: "user Not found" });

}
    const isMatched = await user.matchPassword(password);

    if (!isMatched) {
      return res.status(401).json({ message: "user password not matched" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="production",
      sameSite: "strict",
      maxAge: 7*24*60*60*1000,
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });

    logger.info(`User loged in with id: ${user._id}`);
  } catch (error) {
    res.status(500).json({ message: "Server error while Login : ", error });
    logger.error(`Login error ${error}`);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "user logout sucessfully" });
};


export const profile=async(req,res)=>{
  res.status(200).json({user:req.user})
}