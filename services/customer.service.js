const customerRepository = require('../repositories/customer.repository');

const getCustomers = async () => {
  return await customerRepository.findAll();
};

const createCustomer = async (customerData) => {
  return await customerRepository.create(customerData);
};

const updateCustomer = async (id, customerData) => {
  return await customerRepository.update(id, customerData);
};

const deleteCustomer = async (id) => {
  return await customerRepository.remove(id);
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
