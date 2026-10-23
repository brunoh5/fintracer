import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { router } from "./router.js";

export const app = express();

import "./infra/database/index.js";
import { errorHandler } from "./infra/errors.js";

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(router);

app.use(errorHandler);