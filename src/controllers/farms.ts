import Farms from '../models/farms';
import { getAFarmer } from './farmers';

export interface FarmDetails {
  farmName: string;
  farmCategory: string;
  farmProduce: string;
  farmLocation: string;
  unitPrice: number | any;
  produceRate: number | any;
  unitsAvailable: number | any;
  duration: string;
}

export async function createFarm(userId: string, farmObj: FarmDetails) {
  try {
    const user = await getAFarmer(userId);
    const existingFarm = await Farms.findOne({ farmName: farmObj.farmName });

    if (existingFarm) {
      throw Error('Farm name already taken');
    }
    const userFarm = {
      user: user!._id,
      ...farmObj,
    };
    const newFarm = new Farms(userFarm);
    return newFarm.save();
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAllFarms() {
  try {
    const allFarms = await Farms.find({ deletedAt: null }).sort({
      farmName: 'asc',
    });
    if (!allFarms) {
      throw Error('Unable to retrieve farms');
    }
    return allFarms;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAllFarmsByAUser(userId: string) {
  try {
    const userFarm = await Farms.find({ user: userId });
    // const farmer = await getAFarmer(userId);

    // if (farmer.userCategory !== "farmer") {
    //   throw Error('')
    // }

    if (!userFarm) {
      throw Error('Farm does not exist');
    }
    return userFarm;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAFarm(farmId: string) {
  try {
    const farm = await Farms.findOne({ _id: farmId, deletedAt: null });
    if (!farm) {
      throw Error('Farm does not exist');
    }
    return farm;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function updateFarm(
  farmId: string,
  farmObj: Partial<FarmDetails>,
) {
  return await Farms.findOneAndUpdate({ _id: farmId }, farmObj, { new: true });
}

export async function deleteFarm(farmId: string) {
  return await Farms.findOneAndUpdate(
    { _id: farmId, deletedAt: null },
    { deletedAt: new Date() },
  );
}
