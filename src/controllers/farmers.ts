import Farmers from '../models/farmer';

export interface FarmerDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

export async function createAFarmer(farmerObj: FarmerDetails) {
  try {
    const existingFarmerEmail = await Farmers.findOne({
      email: farmerObj.email,
    });
    const existingPhoneNumber = await Farmers.findOne({
      phone: farmerObj.phone,
    });
    // const [ existingUserEmail, existingPhoneNumber ] = await Promise.all([ Users.findOne({ email: userObj.email }, Users.findOne({ phone: userObj.phone }))]);

    if (existingFarmerEmail) {
      throw Error('Email already exists');
    }

    if (existingPhoneNumber) {
      throw Error('Phone number already exists or Invalid phone number');
    }

    const newFarmer = new Farmers(farmerObj);
    return newFarmer.save();
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAllFarmers() {
  try {
    const farmers = await Farmers.find({ deletedAt: null })
      .sort({ firstName: 'asc' })
      .select('-password -__v -isAdmin -deletedAt');

    if (!farmers) {
      throw Error('Sorry, There are no farmers to view');
    }

    return farmers;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAFarmer(farmerId: string) {
  try {
    const farmer = await Farmers.findOne({
      _id: farmerId,
      deletedAt: null,
    }).select('-password -__v -isAdmin -deletedAt');

    if (!farmer) {
      throw Error('Sorry, Farmer does not exist');
    }
    return farmer;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function updateAFarmer(
  farmerId: string,
  farmerObj: Partial<FarmerDetails>,
) {
  return await Farmers.findOneAndUpdate({ _id: farmerId }, farmerObj, {
    new: true,
  });
}

export async function deleteAFarmer(farmerId: string) {
  return await Farmers.findByIdAndUpdate(
    { _id: farmerId },
    { deletedAt: new Date() },
  );
}
