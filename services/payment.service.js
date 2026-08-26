const paymentRepository = require('../repositories/payment.repository');

const getPayments = async () => {
  return await paymentRepository.findAll();
};

const createPayment = async (paymentData) => {
  return await paymentRepository.create(paymentData);
};

const updatePayment = async (id, paymentData) => {
  return await paymentRepository.update(id, paymentData);
};

const deletePayment = async (id) => {
  return await paymentRepository.remove(id);
};

module.exports = {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
