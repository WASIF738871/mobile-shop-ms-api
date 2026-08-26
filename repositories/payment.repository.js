const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('payments').find(query).toArray();
};

const create = async (paymentData) => {
  return await getDB().collection('payments').insertOne({
    ...paymentData,
    createdAt: new Date(),
  });
};

const update = async (id, paymentData) => {
  return await getDB().collection('payments').updateOne(
    { _id: new ObjectId(id) },
    { $set: paymentData }
  );
};

const remove = async (id) => {
  return await getDB().collection('payments').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
