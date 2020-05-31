import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';

import Farmers from '../models/farmer';
import Farms from '../models/farms';
import { logInUser } from '../helpers/validation';
import { authUser } from '../middleware/verifyUserToken';

export interface LogInUser {
  email: string;
  password: string;
}
const router = Router();

//Authenticate user and get token
router.post('/', async function (req, res) {
  const { error, value } = logInUser(req.body);

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });
    return;
  }

  try {
    let farmer = await Farmers.findOne({ email: value.email });

    if (!farmer) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials. Unable to get user email' });
    }

    if (!farmer) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials. Unable to get farmer email' });
    }
    const isMatch = await bcrypt.compare(value.password, farmer.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials. Password do not match' });
    }

    const payload = {
      user: {
        id: farmer.id,
        isAdmin: farmer.isAdmin,
      },
    };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(404).json({ message: 'Secret not found' });
      return;
    }

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        return res.status(200).json({ message: 'Token generated', token });
      },
    );

    return;
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
    return;
  }
});

router.get('/', authUser, async function (req: any, res) {
  try {
    const [farmer, farm] = await Promise.all([
      await Farmers.findById({
        _id: req.user.id,
        deletedAt: null,
      }).select('-password -__v -isAdmin '),
      await Farms.find({
        user: req.user.id,
        deletedAt: null,
      }),
      await Farms.find({
        user: req.user.id,
        deletedAt: null,
      }),
    ]);

    if (!farmer || !farm) {
      return res.status(400).json({ message: 'Unable to get user details.' });
    }

    return res.status(200).json({ farmer, farm });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
    return;
  }
});
export default router;
