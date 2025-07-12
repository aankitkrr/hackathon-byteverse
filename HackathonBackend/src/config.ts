import dotenv from "dotenv";
dotenv.config();

export const JWT_PASS = process.env.JWT_SECRET ||  "10880h0139019j09cnq183dh0ncinue08bvuebdinamoixjnaq08wh018e313hncqbcoudabcubdubeque019";
export const Data_base_url = process.env.DATABASE_URL;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
