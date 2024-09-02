import express from "express";
import Owner from "../models/owner.models.js";

const router = express.Router();

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await Owner.find();
    if (owners.length > 0) {
      res.status(504).send({ message: "Owner already exists" });
    } else {
      const { fullName, email, password } = req.body;
      const owner = new Owner({
        fullName,
        email,
        password,
      });
      await owner.save();
      res.status(201).send({ message: "Owner created successfully" });
    }
  });
}

export default router;
