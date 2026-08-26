const userRepository = require('../repositories/user.repository');

const getUsers = async () => {
  return await userRepository.findAll();
};

const createUser = async (userData) => {
  return await userRepository.create(userData);
};

const updateUser = async (id, userData) => {
  return await userRepository.update(id, userData);
};

const deleteUser = async (id) => {
  return await userRepository.remove(id);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
