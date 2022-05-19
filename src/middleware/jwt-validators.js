const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidation = (req = request, res = response, next) => {
  const tokenHeader = req.header("x-token");

  if (!tokenHeader) {
    return res.status(401).json({
      ok: false,
      message: "No hay token",
    });
  }

  try {
    const { uid, name } = jwt.verify(tokenHeader, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  jwtValidation,
};
