const expenseService = require('../services/expense.service');
const { sendResponse } = require('../utils/response');

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getExpenses();
    sendResponse(res, 200, 'Expenses retrieved successfully', expenses);
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.createExpense(req.body);
    sendResponse(res, 201, 'Expense created successfully', expense);
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    await expenseService.updateExpense(req.params.id, req.body);
    sendResponse(res, 200, 'Expense updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    await expenseService.deleteExpense(req.params.id);
    sendResponse(res, 200, 'Expense deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
