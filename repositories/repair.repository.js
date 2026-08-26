const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('repairs').find(query).toArray();
};

const create = async (repairData) => {
  return await getDB().collection('repairs').insertOne({
    ...repairData,
    createdAt: new Date(),
  });
};

const update = async (id, repairData) => {
  return await getDB().collection('repairs').updateOne(
    { _id: new ObjectId(id) },
    { $set: repairData }
  );
};

const remove = async (id) => {
  return await getDB().collection('repairs').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
