const { Image } = require('../../database.js');

const createAndAddImages = async (images, product) => {
  try {
    const parsedImages = images.map((i) => {
      if (typeof i === 'string') {
        return { url: i };
      } else {
        return i;
      }
    });
    const newImages = await Image.bulkCreate(parsedImages);
    await product.addImages(newImages);
  } catch (err) {}
};

module.exports = createAndAddImages;
