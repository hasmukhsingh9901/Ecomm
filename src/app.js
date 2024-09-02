import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { engine } from "express-handlebars";
import connectDatabase from "./database/db.js";

// Routes
import indexRoutes from "./routes/index.js"
import ownerRoutes from "./routes/owner.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";


dotenv.config({ path: ".env" });

connectDatabase();

const app = express();
const port = process.env.PORT;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

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
