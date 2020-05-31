import { Router } from 'express';
import bcrypt from 'bcryptjs';

import {
  validateFarm,
  registerFarmerValidate,
  updateFarmerValidate,
} from '../helpers/validation';
import {
  createAFarmer,
  getAllFarmers,
  updateAFarmer,
  deleteAFarmer,
} from '../controllers/farmers';
import {
  createFarm,
  getAllFarmsByAUser,
  updateFarm,
  deleteFarm,
  getAFarm,
} from '../controllers/farms';
import { authUser, RequestType } from '../middleware/verifyUserToken';
import authAdmin from '../middleware/verifyAdminToken';
import { getAFarmer } from '../controllers/farmers';

const router = Router();

//Create a Farmer
router.post('/', async function (req, res) {
  const { error, value } = registerFarmerValidate(req.body);

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);
    const farmer = await createAFarmer(value);
    const { firstName, lastName, phone, email, address } = farmer;
    const newFarmer = { firstName, lastName, phone, email, address };

    res
      .status(201)
      .json({ msg: 'Farmer created successfully', farmer: newFarmer });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Get all farmers
router.get('/', authAdmin, async function (_req, res) {
  try {
    const doc = await getAllFarmers();

    if (!doc) {
      res.status(400).json({ msg: 'Sorry, there are no farmers' });
      return;
    }
    return res.status(200).json({ msg: 'Farmers Retrieved Successfully', doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Get a farmer
router.get('/:farmerId', authUser, async function (req, res) {
  const farmerId = req.params.farmerId;

  if (!farmerId) {
    return res.status(400).json({ msg: 'Invalid URL' });
  }

  try {
    const doc = await getAFarmer(farmerId);
    if (!doc) {
      res.status(400).json({ msg: 'Farmer not found' });
    }
    return res.status(200).json({ msg: 'Farmer retrieved Successfully', doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Update farmer
router.patch('/:farmerId', authUser, async function (req, res) {
  const farmerId = req.params.farmerId;

  const { error, value } = updateFarmerValidate(req.body);

  if (error) {
    res.status(400).json({ msg: 'Please provide valid parameters', error });
    return;
  }
  try {
    const doc = await updateAFarmer(farmerId, value);

    if (!doc) {
      res.status(404).json({ msg: 'Farmer to edit not found' });
      return;
    }
    return res.status(200).json({ data: doc.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//delete a farmer
router.delete('/:farmerId', authAdmin, async function (req, res) {
  const farmerId = req.params.farmerId;

  if (!farmerId) {
    return res.status(400).json({ msg: 'Invalid URL' });
  }
  try {
    const deletedFarmer = await deleteAFarmer(farmerId);

    if (!deletedFarmer) {
      res.status(404).json({ msg: 'Farmer not found' });
      return;
    }

    res.status(200).json({
      message: `user with id: ${farmerId} has been successfully deleted`,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

// Create a farm
router.patch('/:farmerId/farms', authUser, async function (
  req: RequestType,
  res,
) {
  const farmerId = req.params.farmerId;

  if (farmerId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  const { error, value } = validateFarm(req.body);

  if (error) {
    res.status(400).json({ msg: 'Please provide valid parameters', error });
    return;
  }
  try {
    const createdFarm = await createFarm(farmerId, value);
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

// View all farms owned by a farmer
router.get('/:farmerId/farms', authUser, async function (
  req: RequestType,
  res,
) {
  const farmerId = req.params.farmerId;
  if (!farmerId) {
    res.status(400).json({ msg: 'Invalid url' });
    return;
  }

  if (farmerId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  try {
    const farmerFarms = await getAllFarmsByAUser(farmerId);

    if (!farmerFarms || farmerFarms.length < 1) {
      return res
        .status(400)
        .json({ msg: 'Sorry, there are no farms to view here' });
    }
    return res
      .status(200)
      .json({ msg: 'Farms successfully retrieved', farmerFarms });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

// View a farm owned by a farmer
router.get('/:farmerId/farms/:farmId', authUser, async function (
  req: RequestType,
  res,
) {
  const farmerId = req.params.farmerId;
  const farmId = req.params.farmId;
  if (!farmerId || !farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }

  if (farmerId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  try {
    const farmerFarm = await getAFarm(farmId);

    if (!farmerFarm) {
      return res.status(400).json({ msg: 'Sorry, the farm is unavailable' });
    }
    return res
      .status(200)
      .json({ msg: 'Farm successfully retrieved', farmerFarm });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Edit farm details owned by a user(farmer)
router.patch('/:farmerId/farms/:farmId', authUser, async function (
  req: RequestType,
  res,
) {
  const { farmerId, farmId } = req.params;
  if (!farmerId || !farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }

  if (farmerId !== req.user!.id) {
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
router.delete('/:farmerId/farms/:farmId', authUser, async function (
  req: RequestType,
  res,
) {
  const { farmerId, farmId } = req.params;

  if (!farmerId || !farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }

  if (farmerId !== req.user!.id) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
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

export default router;
