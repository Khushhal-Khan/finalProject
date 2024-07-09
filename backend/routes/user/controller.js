const { Router } = require("express");
const UserModel = require("./model");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../../middleware");

const userRouter = Router();
const secretKey = "secret_key";

userRouter.post("/login", async (req, res) => {
  // console.log(req.body)
  const { email } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "not-exist" });
    }
    const token = jwt.sign({ userExists }, secretKey);
    return res.status(200).json({ userExists, auth: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.toString() });
  }
});

userRouter.post("/create", async (req, res) => {
  const { email, pass, name, lastName, age, gender } = req.body;

  const data = {
    email,
    pass,
    name,
    lastName,
    age,
    gender,
  };

  try {
    const check = await UserModel.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: "User with this email already exists!" });
    }
    await UserModel.create(data);
    // res.status(200).json({message: "Success"})
    const token = jwt.sign({ data }, secretKey);
    
    return res.status(200).json({ data, auth: token });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
});

userRouter.get("/me", jwtMiddleware, async (req, res) => {
  const { _id } = req.user;
  try {
    const userExists = await UserModel.findOne({ _id });
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
    return res.status(401).json({message: "Unauthorized"});
  }

});


userRouter.get("/symptoms", jwtMiddleware, async (req, res) => {
  const { _id } = req.user;
  try {
    const userExists = await UserModel.findOne({ _id });
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
    
  }
  // req.user_id
});


userRouter.get("/vital", jwtMiddleware, async (req, res) => {
  const { _id } = req.user;
  try {
    const userExists = await UserModel.findOne({ _id });
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
  }
  // req.user_id
});



userRouter.get("/third", jwtMiddleware, async (req, res) => {
  const { _id } = req.user;
  try {
    const userExists = await UserModel.findOne({ _id });
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
  }
  // req.user_id
});



module.exports = userRouter;
