const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findByEmail = async (email) => {
  return await getDB().collection('users').findOne({ email });
};

const findById = async (id) => {
  return await getDB().collection('users').findOne({ _id: new ObjectId(id) });
};

const findAll = async (query = {}) => {
  return await getDB().collection('users').find(query).toArray();
};

const create = async (userData) => {
  return await getDB().collection('users').insertOne({
    ...userData,
    createdAt: new Date(),
  });
};

const update = async (id, userData) => {
  return await getDB().collection('users').updateOne(
    { _id: new ObjectId(id) },
    { $set: userData }
  );
};

const remove = async (id) => {
  return await getDB().collection('users').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findByEmail,
  findById,
  findAll,
  create,
  update,
  remove,
};
