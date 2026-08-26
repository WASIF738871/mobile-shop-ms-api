const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('suppliers').find(query).toArray();
};

const create = async (supplierData) => {
  return await getDB().collection('suppliers').insertOne({
    ...supplierData,
    createdAt: new Date(),
  });
};

const update = async (id, supplierData) => {
  return await getDB().collection('suppliers').updateOne(
    { _id: new ObjectId(id) },
    { $set: supplierData }
  );
};

const remove = async (id) => {
  return await getDB().collection('suppliers').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
