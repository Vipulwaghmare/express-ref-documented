
import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("X---------->\n", err);
  res.status(500).send("Something went wrong");
};

export default errorHandler