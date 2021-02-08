import Board from "../../../model/Board";
import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import mongoose from "mongoose";

export default {
 Query: {
  getAllBoard: async (_, args) => {
   try {
    const result = await Board.find().populate({
     path: `author`,
     model: User,
    });

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  getOneBoard: async (_, args) => {
   const { id } = args;
   try {
    const result = await Board.findOne({ _id: id }).populate({
     path: `author`,
     model: User,
    });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },
 Mutation: {
  createBoard: async (_, args) => {
   const { type, title, imgPath, author } = args;
   const current = await CURRENT_TIME();
   try {
    const authorId = mongoose.Types.ObjectId(author);
    const result = await Board.create({
     type,
     title,
     imgPath,
     createdAt: current,
     good: 0,
     hate: 0,
     hit: 0,
     author: authorId,
    });
    console.log(result);
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
