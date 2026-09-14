const userRepository = require("../repositories/user.repository");
const { getDB } = require("../config/database"); // Added
const { comparePassword } = require("../utils/password");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const { ObjectId } = require("mongodb"); // Added

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user || user.status !== "ACTIVE") {
    throw { statusCode: 401, message: "Invalid credentials or account inactive" };
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }

  // Fetch permissions
  const db = getDB();
  const roles = await db
    .collection("roles")
    .find({ _id: { $in: (user.roleIds || []).map((id) => new ObjectId(id)) } })
    .toArray();
  const permissionIds = [...new Set(roles.flatMap((role) => role.permissionIds || []))];
  const permissions = await db
    .collection("permissions")
    .find({ _id: { $in: permissionIds } })
    .toArray();
  const permissionNames = permissions.map((p) => p.name);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Omit sensitive data
  const { passwordHash, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, accessToken, refreshToken, permissions: permissionNames };
};

exports.refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw {
      statusCode: 401,
      message: "Refresh token required",
    };
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Invalid or expired refresh token",
    };
  }

  const userId = decoded.userId || decoded.id || decoded._id;

  if (!userId) {
    throw {
      statusCode: 401,
      message: "Invalid refresh token",
    };
  }

  const user = await userRepository.findById(userId);

  if (!user || user.status !== "ACTIVE") {
    throw {
      statusCode: 401,
      message: "User not found or account inactive",
    };
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
  };
};
