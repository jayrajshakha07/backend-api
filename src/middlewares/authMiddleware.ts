import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "jay");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
