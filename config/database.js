const { MongoClient } = require('mongodb');
const env = require('./env');
const logger = require('../utils/logger');

let client;
let db;

const connectDB = async () => {
  try {
    client = new MongoClient(env.mongodb.uri);
    await client.connect();
    db = client.db(env.mongodb.dbName);
    logger.info(`Connected to MongoDB: ${env.mongodb.dbName}`);
    return db;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    logger.info('MongoDB connection closed');
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB,
};
