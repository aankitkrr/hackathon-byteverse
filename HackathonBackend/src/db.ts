import mongoose, { model, Schema } from "mongoose";
import { Data_base_url } from "./config";

mongoose.connect( Data_base_url! );

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 3},
    password : String,
    email: { type: String, unique: true, required: true }
})

// user ka roadmap 

const RoadmapTemplateSchema = new mongoose.Schema({
    goal: { type: String, required: true },
    level: { type: String, required: true },
    title: { type: String, required: true }
}, { timestamps: true });
  

  //gamified - section --> progress tracker for game 

  const UserStepSchema = new mongoose.Schema({
    level: { type: Number, required: true },
    title: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["locked", "current", "complete"], 
      default: "locked" 
    },
    xp: { type: Number, default: 0 },
    duration: { type: Number },
    tip: { type: String }
});
  
const UserProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    goal: { type: String, required: true },
    totalXP: { type: Number, default: 0 },
    progress: [UserStepSchema]
  },{ timestamps: true });
  

export const UserProgressModel = mongoose.model("UserProgress", UserProgressSchema);
export const RoadmapModel = mongoose.model("RoadmapTemplates", RoadmapTemplateSchema);
export const userModel = model("Users", UserSchema);