import Board from "../../../model/Board";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllBoard: async (_, args) => {
   try {
    const result = await Board.find();

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  getOneBoard: async (_, args) => {
   const { id } = args;
   try {
    const result = await Board.findOne({ _id: id });

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
    console.log(type, title, imgPath, author);
    const result = await Board.create({
     type,
     title,
     imgPath,
     createdAt: current,
     good: 0,
     hate: 0,
     hit: 0,
     author,
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
