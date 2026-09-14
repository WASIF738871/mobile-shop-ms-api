const { getDB } = require("../config/database");
const { ObjectId } = require("mongodb");

exports.findAll = async (query = {}) => {
  return await getDB().collection("products").find(query).toArray();
};

exports.create = async (productData) => {
  return await getDB()
    .collection("products")
    .insertOne({
      ...productData,
      createdAt: new Date(),
    });
};

exports.getProductsWithStocks = async (match) => {
  return await getDB()
    .collection("products")
    .aggregate([
      // 1. Filter products
      {
        $match: match,
      },

      // 2. Find inventory transactions for each product
      {
        $lookup: {
          from: "inventory_movements",
          localField: "_id",
          foreignField: "productId",
          as: "inventory",
        },
      },

      // 3. Calculate current stock
      {
        $addFields: {
          stock: {
            $sum: {
              $map: {
                input: "$inventory",
                as: "item",

                in: {
                  $switch: {
                    branches: [
                      // Stock coming IN
                      {
                        case: {
                          $in: ["$$item.type", ["OPENING_STOCK", "PURCHASE", "RETURN"]],
                        },
                        then: "$$item.qty",
                      },

                      // Stock going OUT
                      {
                        case: {
                          $in: ["$$item.type", ["SALE", "REPAIR_USAGE", "DAMAGE"]],
                        },
                        then: {
                          $multiply: ["$$item.qty", -1],
                        },
                      },

                      // Adjustment can be + or -
                      {
                        case: {
                          $eq: ["$$item.type", "ADJUSTMENT"],
                        },
                        then: "$$item.qty",
                      },
                    ],

                    default: 0,
                  },
                },
              },
            },
          },
        },
      },

      // 4. Remove inventory transactions from response
      {
        $project: {
          inventory: 0,
        },
      },
    ])
    .toArray();
};

exports.update = async (id, productData) => {
  return await getDB()
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: productData });
};

exports.remove = async (id) => {
  return await getDB()
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });
};
