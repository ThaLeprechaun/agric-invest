import { Router } from 'express';
import { getAllFarms, getAFarm } from '../controllers/farms';

const router = Router();

//View all farms
router.get('/', async function(_req, res) {
  try {
    const doc = await getAllFarms();

    if (!doc) {
      return res.status(404).json({ message: 'No Farms retrieved' });
    }

    return res
      .status(200)
      .json({ message: 'All Farms retrieved successfully', doc });
  } catch (error) {
    res.status(500).json({ err: error.message });

    return;
  }
});

//View a farm
router.get('/:farmId', async function(req, res) {
  const farmId = req.params.farmId;
  if (!farmId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }
  try {
    const farm = await getAFarm(farmId);

    if (!farm) {
      return res.status(400).json({ msg: 'Sorry, the farm is unavailable' });
    }
    return res.status(200).json({ msg: 'Farm successfully retrieved', farm });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

export default router;
