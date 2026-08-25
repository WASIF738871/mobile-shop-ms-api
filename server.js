const app = require('./app');
const env = require('./config/env');
const { connectDB } = require('./config/database');
const logger = require('./utils/logger');

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    const PORT = env.port;
    app.listen(PORT, () => {
      logger.info(`Server running in ${env.nodeEnv} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
