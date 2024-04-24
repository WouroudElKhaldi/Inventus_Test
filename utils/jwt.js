import jwt from "jsonwebtoken";
import dotend from "dotenv";
dotend.config();

const secret = `${process.env.JWT_SECRET}` || "secretKey";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    },
    secret
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
