import Users from '../models/users';

export interface UserDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  userCategory: string;
}

export async function createAUser(userObj: UserDetails) {
  try {
    const existingUserEmail = await Users.findOne({ email: userObj.email });
    const existingPhoneNumber = await Users.findOne({ phone: userObj.phone });
    // const [ existingUserEmail, existingPhoneNumber ] = await Promise.all([ Users.findOne({ email: userObj.email }, Users.findOne({ phone: userObj.phone }))]);

    if (existingUserEmail) {
      throw Error('Email already exists');
    }

    if (existingPhoneNumber) {
      throw Error('Phone number already exists or Invalid phone number');
    }

    const newUser = new Users(userObj);
    return newUser.save();
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAllUsers() {
  try {
    const users = await Users.find({ deletedAt: null })
      .sort({ firstName: 'asc' })
      .select('-password -__v -isAdmin -deletedAt');

    if (!users) {
      throw Error('Sorry, There are no users to view');
    }

    return users;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAUser(userId: string) {
  try {
    const user = await Users.findOne({ _id: userId, deletedAt: null }).select(
      '-password -__v -isAdmin -deletedAt',
    );

    if (!user) {
      throw Error('Sorry, User does not exist');
    }
    return user;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAFarmer(userId: string) {
  try {
    const farmer = await Users.findOne({
      _id: userId,
      userCategory: 'farmer',
      deletedAt: null,
    });

    if (!farmer) {
      throw Error('Sorry, user is not a farmer.');
    }
    return farmer;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getAnInvestor(userId: string) {
  try {
    const investor = await Users.findOne({
      _id: userId,
      userCategory: 'investor',
      deletedAt: null,
    });

    if (!investor) {
      throw Error('Sorry, user is not an investor.');
    }
    return investor;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function updateAUser(
  userId: string,
  userObj: Partial<UserDetails>,
) {
  return await Users.findOneAndUpdate({ _id: userId }, userObj, { new: true });
}

export async function deleteAUser(userId: string) {
  // try {
  //   const user = await Users.findOne({ _id: userId, userCategory: 'investor', deletedAt: null });
  //   const updatedUser = await Users.findByIdAndUpdate({ _id: user!._id }, { deletedAt: new Date() });
  // } catch (error) {

  // }

  return await Users.findByIdAndUpdate(
    { _id: userId },
    { deletedAt: new Date() },
  );
}
