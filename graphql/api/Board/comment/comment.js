import Comment from "../../../model/Comment";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getComment: async (_, args) => {
   const { writtenPlacer } = args;
   try {
    const result = await Comment.find({ writtenPlacer });
    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
 Mutation: {
  createComment: async (_, args) => {
   const { desc, author, writtenPlacer } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await Comment.create({
     writtenPlacer,
     desc,
     author,
     createdAt: current,
     good: 0,
     hate: 0,
    });
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
