const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, roles: user.roleIds }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn,
  });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwt.accessSecret);
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwt.refreshSecret);
};
