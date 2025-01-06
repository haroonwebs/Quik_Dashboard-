import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jfoefbaeflksafo";

export const generateToken = (payload: object): string => {
  try {
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};
