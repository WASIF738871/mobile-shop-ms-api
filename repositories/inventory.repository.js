const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const findAllMovements = async () => {
  return await getDB().collection('inventory_movements').find().sort({ createdAt: -1 }).toArray();
};

const createMovement = async (movementData) => {
  return await getDB().collection('inventory_movements').insertOne({
    ...movementData,
    createdAt: new Date(),
  });
};

module.exports = {
  findAllMovements,
  createMovement,
};
