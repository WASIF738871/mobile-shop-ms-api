const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./utils/logger");

const app = express();

const corsOptions = {
  origin: env.clientUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// app.use(cors({
//   origin: env.clientUrl,
//   credentials: true,
// }));

// Security Middlewares
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", limiter);

// Basic Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));
}

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/sales", require("./routes/sales.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/customers", require("./routes/customer.routes"));
app.use("/api/expenses", require("./routes/expense.routes"));
app.use("/api/suppliers", require("./routes/supplier.routes"));
app.use("/api/payments", require("./routes/payment.routes"));
app.use("/api/purchases", require("./routes/purchase.routes"));
app.use("/api/repairs", require("./routes/repair.routes"));
app.use("/api/roles", require("./routes/role.routes"));
app.use("/api/inventory", require("./routes/inventory.routes"));
app.use("/api/reports", require("./routes/report.routes"));

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
