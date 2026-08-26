const { getDB } = require('../config/database');

const getDashboardStats = async () => {
  const db = getDB();
  
  // Basic aggregation - assumes collections 'sales', 'repairs', 'expenses', 'products'
  const sales = await db.collection('sales').find().toArray();
  const repairs = await db.collection('repairs').find().toArray();
  const expenses = await db.collection('expenses').find().toArray();
  const products = await db.collection('products').find().toArray();

  const today = new Date().toISOString().split('T')[0];

  const todaySales = sales.filter(s => s.createdAt.toISOString().startsWith(today)).reduce((sum, s) => sum + s.totalAmount, 0);
  const todayRepairs = repairs.filter(r => r.createdAt.toISOString().startsWith(today)).reduce((sum, r) => sum + r.estimatedCost, 0);
  const todayExpenses = expenses.filter(e => e.date === today).reduce((sum, e) => sum + e.amount, 0);

  return {
    todaySales,
    todayRepairs,
    todayExpenses,
    todayProfit: todaySales + todayRepairs - todayExpenses,
    monthlySales: sales.reduce((sum, s) => sum + s.totalAmount, 0), // Simplifying: total all-time
    monthlyProfit: 0, // Placeholder for more complex aggregation
    pendingRepairsCount: repairs.filter(r => r.status === 'RECEIVED').length,
    readyRepairsCount: repairs.filter(r => r.status === 'READY').length,
    lowStockCount: products.filter(p => p.stock !== undefined && p.stock <= (p.minStock || 0)).length,
    inventoryValue: products.reduce((sum, p) => sum + (p.purchasePrice || 0) * (p.stock || 0), 0),
    outstandingPayments: 0, // Placeholder
    recentSales: sales.slice(-3).map(s => ({ id: s._id, invoice: s.saleNumber || 'N/A', customer: s.customer || 'N/A', total: s.totalAmount, status: 'PAID' })),
    lowStockProducts: products.filter(p => p.stock !== undefined && p.stock <= (p.minStock || 0)).map(p => ({ id: p._id, name: p.name || p.model, stock: p.stock, minStock: p.minStock }))
  };
};

const getProfitLoss = async () => {
  const db = getDB();
  const sales = await db.collection('sales').find().toArray();
  const expenses = await db.collection('expenses').find().toArray();

  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalCosts = expenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    totalRevenue,
    productSalesRev: totalRevenue,
    accessorySalesRev: 0,
    repairRev: 0,
    totalCosts,
    productCost: 0,
    repairPartsCost: 0,
    operatingExpenses: totalCosts,
    grossProfit: totalRevenue - totalCosts,
    netProfit: totalRevenue - totalCosts,
    partners: []
  };
};

module.exports = {
  getDashboardStats,
  getProfitLoss,
};
