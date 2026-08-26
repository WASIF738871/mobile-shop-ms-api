const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const create = async (saleData) => {
  return await getDB().collection('sales').insertOne({
    ...saleData,
    createdAt: new Date(),
  });
};

const findAll = async () => {
  return await getDB().collection('sales').find().sort({ createdAt: -1 }).toArray();
};

module.exports = {
  create,
  findAll,
};
