const productRepository = require('../repositories/product.repository');

const getProducts = async (category, status) => {
  const match = {};

  if (category) {
    match.category = category;
  }

  if (status) {
    match.status = status;
  }
  console.log(match)

  return await productsCollection
    .aggregate([
      // 1. Filter products
      {
        $match: match,
      },

      // 2. Find inventory transactions for each product
      {
        $lookup: {
          from: "inventory",
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
                          $in: [
                            "$$item.type",
                            [
                              "OPENING_STOCK",
                              "PURCHASE",
                              "RETURN",
                            ],
                          ],
                        },
                        then: "$$item.qty",
                      },

                      // Stock going OUT
                      {
                        case: {
                          $in: [
                            "$$item.type",
                            [
                              "SALE",
                              "REPAIR_USAGE",
                              "DAMAGE",
                            ],
                          ],
                        },
                        then: {
                          $multiply: [
                            "$$item.qty",
                            -1,
                          ],
                        },
                      },

                      // Adjustment can be + or -
                      {
                        case: {
                          $eq: [
                            "$$item.type",
                            "ADJUSTMENT",
                          ],
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

const createProduct = async (productData) => {
  return await productRepository.create(productData);
};

const updateProduct = async (id, productData) => {
  return await productRepository.update(id, productData);
};

const deleteProduct = async (id) => {
  return await productRepository.remove(id);
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
