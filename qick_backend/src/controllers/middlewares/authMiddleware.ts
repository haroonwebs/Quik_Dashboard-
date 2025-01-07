import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JwtPayloadType } from "jsonwebtoken";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "hfoiejfkdsbfjaT";

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
}

type JwtPayload = JwtPayloadType & {
  id: number;
  role: string;
};

export const is_Admin = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User !",
      });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Token not decoded",
      });
    }
    if (decodedToken.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin have access to this route",
      });
    }

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.send("token expired!");
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
