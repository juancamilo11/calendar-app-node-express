const { request, response } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt/jwt");

const createUser = async (req = request, res = response) => {
  // console.log(req.body)

  const { name, email, password } = req.body;

  // if(name.length < 5) {
  //     res.status(400).json({
  //         ok: false,
  //         message: "Name must be 5 or more chars",
  //     });
  // }
  //

  // const errors = validationResult(req);

  // // console.log(JSON.stringify(errors, null, 3));

  // if(!errors.isEmpty()) {
  //     return res.status(400).json({
  //         ok: false,
  //         errors: errors.mapped()
  //     })
  // }

  const userToSave = new User(req.body);

  const salt = bcrypt.genSaltSync();
  userToSave.password = bcrypt.hashSync(password, salt);

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: `User with email ${email} already exists.`,
      });
    }

    await userToSave.save();

    // Generate JWT
    const token = await generateJWT(userToSave.id, userToSave.name);

    return res.status(201).json({
      ok: true,
      message: `User created. Uid: ${userToSave.id}`,
      uid: userToSave.id,
      name: userToSave.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "User data is invalid",
    });
  }
};

const userLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: `User with email ${email} does not exist.`,
      });
    }

    // Validate password
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        ok: false,
        response: `Invalid password`,
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "User data is invalid",
    });
  }
};

const validateToken = async (req = request, res = response) => {
  const uid = req.uid;
  const name = req.name;

  // Generate a new token
  const token = generateJWT(uid, name);

  res.json({
    ok: true,
    response: "Renew Token",
    token,
  });
};

module.exports = {
  createUser,
  userLogin,
  validateToken,
};
