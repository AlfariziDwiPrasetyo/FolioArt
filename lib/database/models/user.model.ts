import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  username: string;
  name: string;
  photo: string;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
});

const User = models?.User || model("User", UserSchema);

export default User;
