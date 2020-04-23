import Farms from '../models/farms';
import Investments from '../models/investments';
import { getAnInvestor } from './users';
import { getAFarm } from './farms';

export interface InvestmentDetails {
  units: number;
  amount: number;
  returns: number;
  investmentDate: Date;
}

export async function addInvestment(
  userId: string,
  farmId: string,
  unitsToInvest: number,
) {
  try {
    const user = await getAnInvestor(userId);
    const farm = await getAFarm(farmId);

    if (!unitsToInvest) {
      throw Error(
        'Unable to invest. Enter the number of units you wish to invest',
      );
    }
    if (unitsToInvest > farm.unitsAvailable) {
      throw Error('Unable to invest. Units are unavailable for now');
    }
    const amount = unitsToInvest * farm.unitPrice;
    const returns = amount + (farm.produceRate / 100) * amount;

    const userInvestment = {
      user: user!._id,
      farm: farm!._id,
      units: unitsToInvest,
      amount,
      returns,
    };
    const newInvestment = new Investments(userInvestment);

    return newInvestment.save();
  } catch (error) {
    throw Error(error.message);
  }
}

export async function updateFarmByInvest(
  farmId: string,
  unitsToInvest: number,
) {
  // const user = await getAnInvestment(investId);
  const farm = await getAFarm(farmId);
  const newFarmDetails = await Farms.findOneAndUpdate(
    { _id: farmId, deletedAt: null },
    {
      unitsAvailable: farm.unitsAvailable - unitsToInvest,
    },
    { new: true },
  );
  return newFarmDetails;
}

export async function getAllInvestments() {
  try {
    const allInvestments = await Investments.find();

    if (!allInvestments) {
      throw Error('Sorry, there are no investments to view');
    }

    return allInvestments;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAnInvestment(investId: string) {
  try {
    const investment = await Investments.findById({ _id: investId });

    if (!investment) {
      throw Error('Sorry, Investment does not exist');
    }

    return investment;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getInvestmentsByUser(userId: string) {
  try {
    const userInvestments = await Investments.find({ user: userId });

    if (!userInvestments) {
      throw Error('Sorry, you do not have any investment');
    }

    return userInvestments;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getFarmsInvestmentedByUser(userId: string) {
  try {
    const userInvestments = await Investments.find({ user: userId });

    if (!userInvestments) {
      throw Error('Sorry, you do not have any investment');
    }

    const farmId = userInvestments.map(farm => {
      const data = farm.farm;
      return data;
    });

    let farmDetails = await Promise.all(
      farmId.map(async farm => {
        const data = await getAFarm(farm);
        return data;
      }),
    );

    return farmDetails;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function deleteAnInvestment(investId: string) {
  try {
    const investment = await Investments.findOneAndUpdate(
      { _id: investId },
      { deletedAt: new Date() },
      { new: true },
    );

    if (!investment) {
      throw Error('Sorry, Investment does not exist');
    }
    return investment;
  } catch (error) {
    throw Error(error.message);
  }
}
