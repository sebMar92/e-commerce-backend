const { Networks} = require('../../database.js');

const getNetworks = async () => {
  try {
    const network = await Networks.findAll()
    if(network){
        return network
    } else {
      return {
        error: 'There are not networks saved'
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getNetworks;