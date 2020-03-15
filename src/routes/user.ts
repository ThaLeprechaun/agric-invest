import { Router } from 'express';
import bcrypt from 'bcryptjs';

import {
  registerValidate,
  updateUserValidate,
  validateFarm,
} from '../helpers/validation';
import {
  createAUser,
  getAllUsers,
  getAUser,
  updateAUser,
  deleteAUser,
} from '../controllers/users';
import {
  createFarm,
  getAllFarmsByAUser,
  updateFarm,
  deleteFarm,
  getAFarm,
} from '../controllers/farms';
import {
  addInvestment,
  updateFarmByInvest,
  getAllInvestments,
  getAnInvestment,
} from '../controllers/investments';
import { authUser, RequestType } from '../middleware/verifyUserToken';
import authAdmin from '../middleware/verifyAdminToken';

const router = Router();

//Create a User
router.post('/', async function(req, res) {
  const { error, value } = registerValidate(req.body);

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);
    const user = await createAUser(value);
    const { firstName, lastName, phone, email, userCategory } = user;
    const newUser = { firstName, lastName, phone, email, userCategory };

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
    return;
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }
});

//Get all users
router.get('/', authAdmin, async function(_req, res) {
  try {
    const doc = await getAllUsers();

    if (!doc) {
      res.status(400).json({ msg: 'Sorry, there are no users' });
      return;
    }
    return res.status(200).json({ msg: 'Users Retrieved Successfully', doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Get a user
router.get('/:userId', authUser, async function(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ msg: 'Invalid URL' });
  }

  try {
    const doc = await getAUser(userId);
    if (!doc) {
      res.status(400).json({ msg: 'User not found' });
    }
    return res.status(200).json({ msg: 'User retrieved Successfully', doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Update user
router.patch('/:userId', authUser, async function(req, res) {
  const userId = req.params.userId;

  const { error, value } = updateUserValidate(req.body);

  if (error) {
    res.status(400).json({ msg: 'Please provide valid parameters', error });
    return;
  }
  try {
    const doc = await updateAUser(userId, value);

    if (!doc) {
      res.status(404).json({ msg: 'User to edit not found' });
      return;
    }
    return res.status(200).json({ data: doc.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//delete a user
router.delete('/:userId', authAdmin, async function(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ msg: 'Invalid URL' });
  }
  try {
    const deletedUser = await deleteAUser(userId);

    if (!deletedUser) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }

    res.status(200).json({
      message: `user with id: ${userId} has been successfully deleted`,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

// Create a farm
router.patch('/:userId/farms', authUser, async function(req: RequestType, res) {
  const userId = req.params.userId;

  if (userId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  const { error, value } = validateFarm(req.body);

  if (error) {
    res.status(400).json({ msg: 'Please provide valid parameters', error });
    return;
  }
  try {
    const createdFarm = await createFarm(userId, value);
    if (!createdFarm) {
      return res.status(400).json({ msg: 'Unable to create farm' });
    }
    return res.status(200).json({
      message: 'Farm successfully created',
      createdFarm,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

// View all farms owned by a user(farmer)
router.get('/:userId/farms', authUser, async function(req: RequestType, res) {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({ msg: 'Invalid url' });
    return;
  }

  if (userId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  try {
    const userFarms = await getAllFarmsByAUser(userId);

    if (!userFarms || userFarms.length < 1) {
      return res
        .status(400)
        .json({ msg: 'Sorry, there are no farms to view here' });
    }
    return res
      .status(200)
      .json({ msg: 'Farms successfully retrieved', userFarms });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

// View a farm owned by a user(farmer)
router.get('/:userId/farms/:farmId', authUser, async function(
  req: RequestType,
  res,
) {
  const userId = req.params.userId;
  const farmId = req.params.farmId;
  if (!userId || !farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }

  if (userId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  try {
    const userFarm = await getAFarm(farmId);

    if (!userFarm) {
      return res.status(400).json({ msg: 'Sorry, the farm is unavailable' });
    }
    return res
      .status(200)
      .json({ msg: 'Farm successfully retrieved', userFarm });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Edit farm details owned by a user(farmer)
router.patch('/:userId/farms/:farmId', authUser, async function(
  req: RequestType,
  res,
) {
  // This route should have auth
  const { userId, farmId } = req.params;
  if (!userId || !farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }

  if (userId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }

  const { error, value } = validateFarm(req.body);

  if (error) {
    res
      .status(400)
      .json({ msg: 'Please provide valid parameters to update farm', error });
    return;
  }
  try {
    const userFarm = await updateFarm(farmId, value);
    return res.status(200).json({ msg: 'Farm successfully updated', userFarm });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Delete farm owned by a user(farmer)
router.delete('/:userId/farms/:farmId', authUser, async function(
  req: RequestType,
  res,
) {
  const { userId, farmId } = req.params;

  if (userId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }

  if (!userId || !farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }
  try {
    const deletedFarm = await deleteFarm(farmId);
    return res
      .status(200)
      .json({ msg: 'Farm successfully deleted', deletedFarm });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Add investment(investor)
router.patch('/:userId/farms/:farmId/invests', authUser, async function(
  req: RequestType,
  res,
) {
  const { userId, farmId } = req.params;

  if (userId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }

  if (!userId || !farmId) {
    return res.status(400).json({ msg: 'Invalid userId or farmId' });
  }

  const unitsToInvest = Number(req.body.units);

  if (!unitsToInvest) {
    return res
      .status(400)
      .json({ msg: 'Unable to invest. Enter the units you wish to invest.' });
  }
  try {
    const newInvestment = await addInvestment(userId, farmId, unitsToInvest);
    const updatedFarm = await updateFarmByInvest(farmId, unitsToInvest);
    const investment = {
      newInvestment,
      updatedFarm,
    };
    return res
      .status(200)
      .json({ msg: 'Investment successfully created', investment });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//View all investments by a user(investor)
router.get('/:userId/invests', authUser, async function(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({ msg: 'Invalid url' });
    return;
  }
  try {
    const userInvestments = await getAllInvestments();

    if (!userInvestments) {
      return res
        .status(400)
        .json({ msg: 'Sorry, you do not have any investments here' });
    }
    return res
      .status(200)
      .json({ msg: 'Investments successfully retrieved', userInvestments });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//View an investment by a user(investor)
router.get('/:userId/invests/:investId', authUser, async function(req, res) {
  const { userId, investId } = req.params;

  if (!userId || !investId) {
    res.status(400).json({ msg: 'Invalid url' });
    return;
  }
  try {
    const investment = await getAnInvestment(investId);

    if (!investment) {
      return res.status(400).json({ msg: 'Sorry, unable to get investment' });
    }
    return res
      .status(200)
      .json({ msg: 'Investment successfully retrieved', investment });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

export default router;
