const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

//create a user
router.post("/createuser", async (req, res) => {
  try {
    const result = validate1(req.body);
    if (result.error) return res.status(400).send(result.error.msg);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Already registered mail");

    const secPass = await bcrypt.hash(req.body.password, 10);

    user = new User({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    console.log(user);
    let reg = await user.save();
    const token = jwt.sign({ id: user._id }, "ayushsingh");
    console.log(token);
    res.json(token);
  } catch (error) {
    console.log(error.message);
  }
});

//authenticate a user

router.post("/login", async (req, res) => {
  let success = false;
  const result = validate2(req.body);
  if (!result) return res.status(400).send(result.error);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ success, err: "invalid email or pass" });

  const authen = bcrypt.compare(user.password, req.body.password);
  if (!authen)
    return res.status(400).send({ success, err: "invalid email or pass" });

  const token = jwt.sign({ id: user._id }, "ayushsingh");
  success = true;
  res.send({ success, token });
});

router.post("/getuser", fetchUser, async (req, res) => {
  const userId = req.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
});

function validate1(result) {
  const Schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return Schema.validate(result);
}
function validate2(result) {
  const Schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  return Schema.validate(result);
}

module.exports = router;
