const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('purchases').find(query).toArray();
};

const create = async (purchaseData) => {
  return await getDB().collection('purchases').insertOne({
    ...purchaseData,
    createdAt: new Date(),
  });
};

const update = async (id, purchaseData) => {
  return await getDB().collection('purchases').updateOne(
    { _id: new ObjectId(id) },
    { $set: purchaseData }
  );
};

const remove = async (id) => {
  return await getDB().collection('purchases').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
