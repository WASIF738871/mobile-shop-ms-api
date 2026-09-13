const env = require("./env");

const allowedOrigins = env.clientUrls || [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }


    return callback(new Error(`CORS Policy: ${origin} is not authorized in ${env.nodeEnv} mode.`));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
