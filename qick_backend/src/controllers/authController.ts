import { Request, Response } from "express";
import { User } from "../models /usersModel";
import { AppDataSource } from "../dbConnection";
import { authLogin, authTypes } from "./types/authtypes";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";
import { generateToken } from "../utils/jsonToken";

// signup validation scheema

const signupValidationScheema = Joi.object<authTypes>({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user"),
});

// login validation scheema

const loginValidationScheem = Joi.object<authLogin>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// login function

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error, value } = signupValidationScheema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((details) => details.message),
      });
    }
    const { name, email, password, role }: authTypes = value;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with email already exist. Please, try another email",
      });
    }
    // password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    // user saving to database
    const newUser = await userRepository.save(user);
    const { password: string, ...resUser } = newUser;
    if (resUser) {
      // generating token
      const token = generateToken({ id: resUser.id });
      return res.status(201).json({
        success: true,
        message: "Signup successfuly",
        user: resUser,
        token,
      });
    }
  } catch (error: any) {
    console.log("error in signup", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// login controller

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error, value } = loginValidationScheem.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((details) => details.message),
      });
    }
    const { email, password }: authLogin = value;

    const loginRepositery = AppDataSource.getRepository(User);
    const user = await loginRepositery.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password !",
      });
    }
    const token = generateToken({ id: user.id });
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not generated !",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login Successfuly",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error: ${error}`,
    });
  }
};
