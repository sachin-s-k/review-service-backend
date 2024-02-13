import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import { config,connectDB } from "./config/dbConfig";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6000

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use('/review',router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})

connectDB(config)