import express from "express";
import cors from "cors";
import { userMiddleWare } from "./middleware";
import { z } from "zod";
import bcrypt from "bcrypt";
import { RoadmapModel, userModel, UserProgressModel } from "./db";
import jwt from "jsonwebtoken";
import { JWT_PASS } from "./config";
import { generateFromGemini } from "./gemini";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Atleast 3 characters")
    .max(20, "At most 20 characters")
    .regex(
      /^[a-z0-9._]{3,20}$/,
      "Invalid Username must contain lowercase letters (or) digits (or) . (or) _  characters only"
    ),
  password: z
    .string()
    .min(7, "Atleast 7 characters")
    .max(20, "Atmost 20 characters")
    .regex(/[A-Z]/, "Password must contain an UpperCase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one Special Character"
    ),
  email: z.string().email(),
});

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const data = { username, password, email };
  const result = signupSchema.safeParse(data);

  if (result.success) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await userModel.create({
        username,
        password: hashedPassword,
        email,
      });

      res.status(200).json({
        message: "signedup successfully",
      });
    } catch (e: any) {
      res.status(411).json({
        message: "User exists",
      });
    }
  } else {
    res.status(400).json({
      message: result.error.format(),
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await userModel.findOne({ username });

  if (existingUser) {
    const hashedPassword = existingUser.password;
    // @ts-ignore
    const storedPassword = await bcrypt.compare(password, hashedPassword);

    if (storedPassword) {
      const token = jwt.sign(
        {
          id: existingUser.id,
        },
        JWT_PASS
      );
      res.status(200).json({
        token: token,
      });
    } else {
      res.json({
        message: "Please check your Password",
      });
    }
  } else {
    res.status(403).json({
      message: "Incorrect UserName",
    });
  }
});
app.post("/api/v1/roadmap/generate", userMiddleWare, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const { goal, level, skills = [], availableTime, duration } = req.body;

        // Generate roadmap from Gemini
        const geminiResponse = await generateFromGemini({
            goal,
            level,
            skills,
            availableTime,
            duration
        });

        // @ts-ignore
        const jsonMatch = geminiResponse.match(/```json\n([\s\S]*?)\n```/);
        const cleanJson = jsonMatch ? jsonMatch[1] : geminiResponse;
        // @ts-ignore
        const steps = JSON.parse(cleanJson);

        // Create progress array
        const progress = steps.map((step: any, index: number) => ({
            level: index + 1,
            title: step.title || `Step ${index + 1}`,
            status: index === 0 ? "current" : "locked",
            xp: 0,
            duration: step.duration || 1,
            tip: step.tip || "Focus on consistent practice"
        }));

        // Create and save roadmap
       await UserProgressModel.create({
            userId,
            goal,
            totalXP: 0,
            progress
        });

        res.json({
            message : steps
        })

    } catch (error: any) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Roadmap generation failed"
        });
    }
});

app.get("/api/v1/roadmap", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  console.log(userId);
  try {
    const progress = await UserProgressModel.find({ userId });
    if (progress) {
      res.status(200).json({
        roadmap: progress,
      });
    } else {
      res.status(404).json({
        message: " RoadMap not found ! ",
      });
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
});

app.get("/api/v1/roadmap/:id", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const roadmapId = req.params.id;

  try {
    const progress = await UserProgressModel.findOne({
      _id: roadmapId,
      userId: userId,
    });
    if (progress) {
        res.status(200).json({
            success: true,
            roadmap: {
              _id: progress._id,
              goal: progress.goal,
              progress: progress.progress
            }
        });
    } else {
      res.status(404).json({
        message: " RoadMap not found ! ",
      });
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
});

app.post("/api/v1/roadmap/complete", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const title = req.body.title;

  try {
    const userProgress = await UserProgressModel.findOne({ userId });
    if (userProgress) {
      const index = userProgress.progress.findIndex(
        (step) => step.title === title
      );
      if (index == -1) {
        res.status(404).json({
          message: "Step doesnt exist",
        });
      } else {
        if (userProgress.progress[index].status != "complete") {
          userProgress.totalXP += 10;
          userProgress.progress[index].status = "complete";
          userProgress.progress[index].xp = 10;

          index + 1 < userProgress.progress.length
            ? (userProgress.progress[index + 1].status = "current")
            : index;
          await userProgress.save();
        }

        res.status(200).json({
          userProgress: userProgress,
        });
      }
    } else {
      res.status(404).json({
        message: "UserProgress not found",
      });
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
});

app.post("/api/v1/roadmap/undo", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const title = req.body.title;

  try {
    const userProgress = await UserProgressModel.findOne({ userId });
    if (userProgress) {
      const index = userProgress.progress.findIndex(
        (step) => step.title === title
      );
      if (index == -1) {
        res.status(404).json({
          message: "Step doesnt exist",
        });
      } else {
        if (userProgress.progress[index].status != "locked") {
          userProgress.totalXP += 10;
          userProgress.progress[index].status = "locked";
          userProgress.progress[index].xp = 10;

          index - 1 >= 0
            ? (userProgress.progress[index - 1].status = "current")
            : index;
          await userProgress.save();
        }

        res.status(200).json({
          userProgress: userProgress,
        });
      }
    } else {
      res.status(404).json({
        message: "UserProgress not found",
      });
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
});

app.post("/api/v1/roadmap/reset", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  try {
    const userProgress = await UserProgressModel.findOne({ userId });
    if (userProgress) {
      userProgress.progress.forEach((step, i) => {
        step.status = i === 0 ? "current" : "locked";
        step.xp = 0;
      });
      userProgress.totalXP = 0;

      await userProgress.save();
      res.status(200).json({
        userProgress: userProgress,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
});

app.listen(3000);
