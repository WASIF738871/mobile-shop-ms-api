const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAll = async (query = {}) => {
  return await getDB().collection('roles').find(query).toArray();
};

const create = async (roleData) => {
  return await getDB().collection('roles').insertOne({
    ...roleData,
    createdAt: new Date(),
  });
};

const update = async (id, roleData) => {
  return await getDB().collection('roles').updateOne(
    { _id: new ObjectId(id) },
    { $set: roleData }
  );
};

const remove = async (id) => {
  return await getDB().collection('roles').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
