const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('expenses').find(query).toArray();
};

const create = async (expenseData) => {
  return await getDB().collection('expenses').insertOne({
    ...expenseData,
    createdAt: new Date(),
  });
};

const update = async (id, expenseData) => {
  return await getDB().collection('expenses').updateOne(
    { _id: new ObjectId(id) },
    { $set: expenseData }
  );
};

const remove = async (id) => {
  return await getDB().collection('expenses').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
