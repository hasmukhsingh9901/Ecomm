import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import expressSession from 'express-session'
import { engine } from "express-handlebars";
import connectDatabase from "./database/db.js";

// Routes
import indexRoutes from "./routes/index.js"
import ownerRoutes from "./routes/owner.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import flash from 'connect-flash';


dotenv.config({ path: ".env" });

connectDatabase();

const app = express();
const port = process.env.PORT;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET,
  cookie: { secure: false }
}))

app.use(flash());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());

app.use("/", indexRoutes);
app.use("/api/v1/owner", ownerRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product",productRoutes);

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}`);
});
