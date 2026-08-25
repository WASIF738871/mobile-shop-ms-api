const { getDB } = require('../config/database');

const findByEmail = async (email) => {
  return await getDB().collection('users').findOne({ email });
};

const findById = async (id) => {
  return await getDB().collection('users').findOne({ _id: new (require('mongodb').ObjectId)(id) });
};

module.exports = {
  findByEmail,
  findById,
};
