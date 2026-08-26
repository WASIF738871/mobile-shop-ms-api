const roleRepository = require('../repositories/role.repository');

const getRoles = async () => {
  return await roleRepository.findAll();
};

const createRole = async (roleData) => {
  return await roleRepository.create(roleData);
};

const updateRole = async (id, roleData) => {
  return await roleRepository.update(id, roleData);
};

const deleteRole = async (id) => {
  return await roleRepository.remove(id);
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
