import catchAsyncErrors from "../middleware/catchAsyncErrors"
import { Request, Response, NextFunction } from 'express'

export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  throw Error("Yo");
  res.end("register");
});

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.send("login");
});

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.send("logout");
});
