import { Request, Response } from "express"

export const pagination = (req: Request, res: Response) => {


  res.json(res.paginatedResult)
}