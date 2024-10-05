import { connectMongo } from "../database";
import User, { IUser } from "../database/models/user.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: IUser) => {
  try {
    await connectMongo();
    const existingUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (existingUser) {
      return null;
    }

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
  }
};
