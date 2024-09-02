import User from "../models/user.models.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.redirect("/shop");
    } else {
      res.status(401).send({ message: "Invalid email or password" });
      return res.redirect("/");
    }
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
};

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
      return res.redirect("/");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
    return res.redirect("/shop");
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
