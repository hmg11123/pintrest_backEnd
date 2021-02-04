import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Board = new Schema(
 {
  type: {
   type: String,
   require: true,
  },
  title: {
   type: String,
   require: true,
  },
  imgPath: {
   type: String,
   require: true,
  },
  createdAt: {
   type: String,
   require: true,
  },
  good: {
   type: Number,
   require: true,
  },
  hate: {
   type: Number,
   require: true,
  },
  hit: {
   type: Number,
   require: true,
  },
  author: {
   type: String,
   require: true,
  },
  boardComment: [
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

export default mongoose.model("Board", Board, "Board");
