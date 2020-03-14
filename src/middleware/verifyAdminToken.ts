import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestType } from './verifyUserToken';

export default function authAdmin(
  req: RequestType,
  res: Response,
  next: NextFunction,
) {
  // Get token from header
  const token = req.header('x-auth-token');

  // check if not token
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

    if (!req.user!.isAdmin) {
      res.status(401).json({ message: 'You do not have necessary privileges' });

      return;
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: 'Invalid Token' });

    return;
  }
}
