import { Request, Response, NextFunction } from 'express'

const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404 - Page not found");
};

export default pageNotFound