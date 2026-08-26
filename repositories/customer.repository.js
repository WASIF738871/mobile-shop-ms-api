const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('customers').find(query).toArray();
};

const create = async (customerData) => {
  return await getDB().collection('customers').insertOne({
    ...customerData,
    createdAt: new Date(),
  });
};

const update = async (id, customerData) => {
  return await getDB().collection('customers').updateOne(
    { _id: new ObjectId(id) },
    { $set: customerData }
  );
};

const remove = async (id) => {
  return await getDB().collection('customers').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
