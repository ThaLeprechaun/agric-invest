import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface RequestType extends Request {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}

export function authUser(req: RequestType, res: Response, next: NextFunction) {
  //Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    res.status(401).json({ message: 'No token, Access denied' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(404).json({ message: 'Secret not found' });
      return;
    }
    const verified: any = jwt.verify(token, secret);
    req.user = verified.user;

    if (!req.user!.id) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Invalid Token' });
    return;
  }
}
