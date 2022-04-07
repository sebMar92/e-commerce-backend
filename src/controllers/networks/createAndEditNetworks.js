const { Networks} = require('../../database.js');

const createAndEditNetworks = async (networksBody) => {
  try {
    const network = await Networks.findAll();
    if(network.length > 0){
      network[0].facebook = networksBody.facebook;
      network[0].twitter = networksBody.twitter;
      network[0].instagram = networksBody.instagram;
      console.log(network);
      network[0].save();
    } else {
      const newNetwork = await Networks.create({
        facebook: networksBody.facebook,
        twitter: networksBody.twitter,
        instagram: networksBody.instagram,
      })
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAndEditNetworks;
