import Comment from "../../../model/Comment";
import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import mongoose from "mongoose";

export default {
 Query: {
  getComment: async (_, args) => {
   const { writtenPlacer } = args;
   try {
    const result = await Comment.find({ writtenPlacer }).populate({
     path: `author`,
     model: User,
    });
    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  //   getAllComment: async(_,args) => {
  //       const {writtenPlacer} =args;
  //       try{
  //         const reault = await Comment.find({writtenPlacer})

  //         return result
  //       }
  //   }
 },
 Mutation: {
  createComment: async (_, args) => {
   const { desc, author, writtenPlacer } = args;
   const current = await CURRENT_TIME();
   const authorId = mongoose.Types.ObjectId(author);
   try {
    const result = await Comment.create({
     writtenPlacer,
     desc,
     author: authorId,
     createdAt: current,
     good: 0,
     hate: 0,
    });
    console.log(result);
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateComment: async (_, args) => {
   const { id, desc } = args;

   try {
    const result = await Comment.updateOne({ _id: id }, { $set: { desc } });
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  deleteComment: async (_, args) => {
   const { id } = args;

   try {
    const result = await Comment.deleteOne({ _id: id });
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
