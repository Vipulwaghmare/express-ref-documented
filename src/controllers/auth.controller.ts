import catchAsyncErrors from "../middleware/catchAsyncErrors"
import { Request, Response } from 'express'
import sendMail from "./email.controller";
import logger from "../logger";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

export const register = catchAsyncErrors(async (req: Request, res: Response) => {
  throw Error("Yo");
  res.end("register");
});

export const login = catchAsyncErrors(async (req: RequestWithBody, res: Response) => {
  // ! Send mail
  // const data = {
  //   to: 'vipulwaghmare222@gmail.com',
  //   subject: 'Test',
  //   text: 'Text whre will this be',
  //   html: '<h1>Hello this is h1 tag</h1>'
  // }
  // const test = sendMail(data)
  // res.send(test);
  const { email, password } = req.body;

  if (email && password) {

  }
  logger.info("Provider invalid email or password")
  res.send("Invalid Email or Password")
});

export const logout = catchAsyncErrors(async (req: Request, res: Response) => {
  res.send("logout");
});
