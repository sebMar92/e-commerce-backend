const { Product, Category } = require("../../database.js");

const getAverageValues = async (whereStatement, categoryWhereStatement) => {
  whereStatement.limit = 200;
  whereStatement.offset = 0;
  try {
    const prices = await Product.findAll({
      ...whereStatement,
      order: [["price", "ASC"]],
      attributes: ["price"],
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["id"],
          ...categoryWhereStatement,
          through: {
            attributes: [],
          },
        },
      ],
    });
    const objectPrices = prices.map((price) => price.toJSON());
    const simplePrices = objectPrices.map((price) => price.price);
    const averagePrices = +(
      simplePrices.reduce((a, b) => a + b) / simplePrices.length
    ).toFixed(2);
    const finalPrices = {
      lowest: simplePrices[0],
      highest: simplePrices.reverse()[0],
      average: averagePrices,
    };
    return finalPrices;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getAverageValues;
