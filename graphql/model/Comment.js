import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new Schema(
 {
  writtenPlacer: {
   type: String,
   require: true,
  },
  createdAt: {
   type: String,
   require: true,
  },
  desc: {
   type: String,
   require: true,
  },
  author: {
   type: mongoose.Schema.Types.ObjectId,
   ref: `User`,
  },
  good: {
   type: Number,
   require: true,
  },
  hate: {
   type: Number,
   require: true,
  },
 },
 { versionKey: false }
);

export default mongoose.model("Comment", Comment, "Comment");
