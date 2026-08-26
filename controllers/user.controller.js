const userService = require('../services/user.service');
const { sendResponse } = require('../utils/response');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    sendResponse(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    sendResponse(res, 201, 'User created successfully', user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    sendResponse(res, 200, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    sendResponse(res, 200, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
