const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('products').find(query).toArray();
};

const create = async (productData) => {
  return await getDB().collection('products').insertOne({
    ...productData,
    createdAt: new Date(),
  });
};

const update = async (id, productData) => {
  return await getDB().collection('products').updateOne(
    { _id: new ObjectId(id) },
    { $set: productData }
  );
};

const remove = async (id) => {
  return await getDB().collection('products').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
