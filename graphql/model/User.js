import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
 {
  type: {
   type: String,
   require: true,
  },
  name: {
   type: String,
   require: true,
  },
  profileImage: {
   type: String,
   require: true,
  },
  passWord: {
   type: String,
   require: true,
  },
  email: {
   type: String,
   require: true,
  },
  checkCode: {
   type: String,
   require: true,
  },
  mobile: {
   type: String,
   require: true,
  },
  address: {
   type: String,
   require: true,
  },
  detailAddress: {
   type: String,
   require: true,
  },
  zoneCode: {
   type: String,
   require: true,
  },
  birth: {
   type: String,
   require: true,
  },
  nickName: {
   type: String,
   require: true,
  },
  follower: [
   {
    type: String,
    require: true,
   },
  ],
 },
 {
  versionKey: false,
 }
);

export default mongoose.model(`User`, User, `User`);
