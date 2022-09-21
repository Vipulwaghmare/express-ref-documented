import catchAsyncErrors from "../middleware/catchAsyncErrors"
import { Request, Response, NextFunction } from 'express'
import sendMail from "./email.controller";

export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  throw Error("Yo");
  res.end("register");
});

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const data = {
    to: 'vipulwaghmare222@gmail.com',
    subject: 'Test',
    text: 'Text whre will this be',
    html: '<h1>Hello this is h1 tag</h1>'
  }
  const test = sendMail(data)
  res.send(test);
});

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.send("logout");
});
