import { Router } from 'express';
import authAdmin from '../middleware/verifyAdminToken';
import {
  getAllInvestments,
  deleteAnInvestment,
} from '../controllers/investments';
import { getAFarm } from '../controllers/farms';

const router = Router();

//View all investments
router.get('/', authAdmin, async function(_req, res) {
  try {
    const doc = await getAllInvestments();

    if (!doc) {
      return res.status(404).json({ message: 'No Investments retrieved' });
    }

    return res
      .status(200)
      .json({ message: 'All Investments retrieved successfully', doc });
  } catch (error) {
    res.status(500).json({ err: error.message });

    return;
  }
});

//View an investment
router.get('/:investId', authAdmin, async function(req, res) {
  const investId = req.params.investId;
  if (!investId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }
  try {
    const investment = await getAFarm(investId);

    if (!investment) {
      return res.status(400).json({ msg: 'Sorry, no investment to view here' });
    }
    return res
      .status(200)
      .json({ msg: 'Investment successfully retrieved', investment });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

//Delete an investment
router.delete('/:investId', authAdmin, async function(req, res) {
  const investId = req.params.investId;
  if (!investId) {
    return res.status(400).json({ msg: 'Invalid url' });
  }
  try {
    const investment = await deleteAnInvestment(investId);

    if (!investment) {
      return res.status(400).json({ msg: 'Sorry, unable to find investment' });
    }
    return res
      .status(200)
      .json({ msg: 'Investment successfully deleted', investment });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

export default router;
