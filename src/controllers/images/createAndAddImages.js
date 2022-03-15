const { Image } = require("../../database.js");

const createAndAddImages = async (images, product) => {
  try {
    const parsedImages = images.map((i) => {
      return { url: i };
    });
    const newImages = await Image.bulkCreate(parsedImages);
    await product.addImages(newImages);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAndAddImages;
