const roleService = require('../services/role.service');
const { sendResponse } = require('../utils/response');

const getRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getRoles();
    sendResponse(res, 200, 'Roles retrieved successfully', roles);
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);
    sendResponse(res, 201, 'Role created successfully', role);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    await roleService.updateRole(req.params.id, req.body);
    sendResponse(res, 200, 'Role updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    await roleService.deleteRole(req.params.id);
    sendResponse(res, 200, 'Role deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
