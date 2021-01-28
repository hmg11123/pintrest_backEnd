import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllUser: async (_, args) => {
   try {
    const result = await User.find();

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  getDetailUser: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.findOne({ _id: id });
    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
  getUserTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await User.find({
     title: { $regex: `.*${searchValue}.*` },
    }).sort({
     createdAt: -1,
    });

    const cnt = result.length;

    const realTatalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

    return parseInt(realTatalPage);
   } catch (e) {
    console.log(e);
    return 0;
   }
  },
  getAllUserlength: async (_, args) => {
   try {
    const result = await User.find();

    const cnt = result.length;

    return parseInt(cnt);
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
 Mutation: {
  loginUser: async (_, args) => {
   const { email, passWord } = args;
   try {
    const result = await User.findOne({ email, passWord });
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  createUser: async (_, args) => {
   const {
    name,
    email,
    mobile,
    address,
    detailAddress,
    zoneCode,
    passWord,
    birth,
    nickName,
   } = args;
   try {
    const result = await User.create({
     type: "User",
     name,
     email,
     mobile,
     address,
     detailAddress,
     zoneCode,
     passWord,
     checkCode: "",
     birth,
     nickName,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateUser: async (_, args) => {
   const {
    id,
    name,
    email,
    mobile,
    address,
    detailAddress,
    zoneCode,
    passWord,
    birth,
   } = args;
   try {
    const result = await User.updateOne(
     { _id: id },
     {
      $set: {
       name,
       email,
       mobile,
       address,
       detailAddress,
       zoneCode,
       passWord,
       birth,
      },
     }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  deleteUser: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.deleteOne({ _id: id });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
