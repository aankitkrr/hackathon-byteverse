import express from "express";
import cors from "cors";
import { userMiddleWare } from "./middleware";
import { z } from "zod";
import bcrypt from "bcrypt";
import { RoadmapModel, userModel, UserProgressModel } from "./db";
import jwt from "jsonwebtoken";
import { JWT_PASS } from "./config";
import { generateFromGemini } from "./gemini";
import passport from "passport";
import "./passport";

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

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

const setUsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Atleast 3 characters")
    .max(20, "At most 20 characters")
    .regex(
      /^[a-z0-9._]{3,20}$/,
      "Invalid Username must contain lowercase letters (or) digits (or) . (or) _  characters only"
    ),password: z
    .string()
    .min(7, "Atleast 7 characters")
    .max(20, "Atmost 20 characters")
    .regex(/[A-Z]/, "Password must contain an UpperCase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one Special Character"
    )
});

app.post("/api/v1/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const result = signupSchema.safeParse({ username, password, email });

  if (!result.success) {
    res.status(400).json({
      error: "Validation failed",
      details: result.error.format(),
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(200).json({
      message: "Signed up successfully",
    });
  } catch (e: any) {
    if (e.code === 11000) {
      const duplicateField = Object.keys(e.keyValue)[0];
      res.status(409).json({
        error: `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists`,
      });
    } else {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userModel.findOne({ username });

  if(existingUser){
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
      res.status(401).json({
        message: "Please check your Password",
      });
    }
  } else {
    res.status(403).json({
      message: "User not found",
    });
  }
});

app.post("/api/v1/roadmap/generate", userMiddleWare, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const { goal, level, skills = [], availableTime, duration } = req.body;

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

        const progress = steps.map((step: any, index: number) => ({
            level: index + 1,
            title: step.title || `Step ${index + 1}`,
            status: index === 0 ? "current" : "locked",
            xp: 0,
            duration: step.duration || 1,
            tip: step.tip || "Focus on consistent practice"
        }));

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
  const { roadmapId } = req.body;

  try {
    const userProgress = await UserProgressModel.findOne({ userId, _id: roadmapId });
    if (userProgress) {
      const index = userProgress.progress.findIndex(
        (step) => step.title === title
      );
      if (index == -1) {
        res.status(404).json({
          message: "Step doesnt exist",
        });
      } else {
        const step = userProgress.progress[index];
        if (step.status !== "complete") {
          userProgress.totalXP += 10;
          step.status = "complete";
          step.xp = 10;

          if(index + 1 < userProgress.progress.length && userProgress.progress[index + 1].status === "locked") {
            userProgress.progress[index + 1].status = "current";
          }

          await userProgress.save();
        }

        res.status(200).json({ userProgress });
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
  const { roadmapId } = req.body;

  try {
    const userProgress = await UserProgressModel.findOne({ userId, _id: roadmapId });
    if (userProgress) {
      const index = userProgress.progress.findIndex(
        (step) => step.title === title
      );
      if (index == -1) {
        res.status(404).json({
          message: "Step doesnt exist",
        });
      } else {
        const step = userProgress.progress[index];
        if (step.status !== "locked") {
          userProgress.totalXP = Math.max(0, userProgress.totalXP - (step.xp || 0));
          step.status = "locked";
          step.xp = 0;
          if(index - 1 >= 0 && userProgress.progress[index - 1].status === "complete"){
            userProgress.progress[index - 1].status = "current";
          }

          await userProgress.save();
        }
        res.status(200).json({ userProgress });
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
  const { roadmapId } = req.body;
  try {
    const userProgress = await UserProgressModel.findOne({ userId, _id: roadmapId });
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

app.delete("/api/v1/roadmap/:id", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const { id } = req.params;

  try {
    const deleted = await UserProgressModel.findOneAndDelete({ _id: id, userId });
    if (deleted) {
      res.status(200).json({ message: "Roadmap deleted" });
    }else{
      res.status(404).json({ message: "Roadmap not found" });
    }
  }catch (err : any) {
    res.status(500).json({ 
      message: err.message 
    });
  }
});

app.get("/api/v1/user/profile", userMiddleWare, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);
    const roadmaps = await UserProgressModel.find({ userId });

    const totalXP = roadmaps.reduce((sum, roadmap) => sum + (roadmap.totalXP || 0), 0);
    const totalRoadmaps = roadmaps.length;

    res.status(200).json({
      username: user?.username,
      email: user?.email,
      totalXP,
      totalRoadmaps
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load profile data" });
  }
});

app.get("/api/v1/profile", userMiddleWare, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const roadmaps = await UserProgressModel.find({ userId }).sort({ createdAt: -1 });

    const totalRoadmaps = roadmaps.length;
    const totalXP = roadmaps.reduce((acc, roadmap) => acc + (roadmap.totalXP || 0), 0);
    const mostRecentGoal = roadmaps[0]?.goal || "No goal yet";

    res.status(200).json({
      totalRoadmaps,
      totalXP,
      mostRecentGoal
    });
  } catch (err) {
    res.status(500).json({ message: "Profile data fetch failed" });
  }
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/signin" }), async (req, res) => {
  const user = req.user as any;

  if (!user.isNew) {
    const token = jwt.sign({ id: user._id }, JWT_PASS, { expiresIn: "7d" });
    return res.redirect(`${process.env.FRONTEND_ROOT_URI}/google-success?token=${token}`);
  }
  const tempToken = jwt.sign({ email: user.email }, JWT_PASS, { expiresIn: "15m" });

  return res.redirect(`${process.env.FRONTEND_ROOT_URI}/complete-profile?token=${tempToken}`);
});


app.post("/api/v1/oauth/set-username", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) res.status(401).json({ error: "Unauthorized" });

  let payload;
  try {
    payload = jwt.verify(token!, JWT_PASS) as { email: string };
  } catch {
    return void res.status(401).json({ error: "Invalid or expired token" });
  }

  const { username, password } = req.body;

  const result = setUsernameSchema.safeParse({ username, password });
  if (!result.success) {
    return void res.status(400).json({
      error: "Validation failed",
      details: result.error.format(),
    });
  }

  const usernameExists = await userModel.findOne({ username });
  if (usernameExists) {
    return void res.status(409).json({ error: "Username already taken" });
  }

  const emailExists = await userModel.findOne({ email: payload?.email });
  if (emailExists) {
    return void res.status(409).json({ error: "Account already exists with this email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email: payload?.email,
    username,
    password: hashedPassword,
  });

  const finalToken = jwt.sign({ id: user._id }, JWT_PASS, { expiresIn: "7d" });

  return void res.status(200).json({ message: "Username set successfully", token: finalToken });
});

app.listen(3000);
