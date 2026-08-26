const expenseRepository = require('../repositories/expense.repository');

const getExpenses = async () => {
  return await expenseRepository.findAll();
};

const createExpense = async (expenseData) => {
  return await expenseRepository.create(expenseData);
};

const updateExpense = async (id, expenseData) => {
  return await expenseRepository.update(id, expenseData);
};

const deleteExpense = async (id) => {
  return await expenseRepository.remove(id);
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
