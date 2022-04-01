const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const { User } = require('../../database.js');
const generateAccessToken = require('../user/utils/generateAccessToken.js');
const generateRefreshToken = require('../user/utils/generateRefreshToken.js');

const googleAuth = async (data) => {
  const { tokenId } = data;
  try {
    const loginTicket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email_verified, given_name, family_name, picture, email } =
      loginTicket.payload;

    if (email_verified) {
      let user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        user = await User.create({
          firstName: given_name,
          lastName: family_name,
          email: email,
          profilePicture: picture.split('=s')[0] + '=s500',
          rol: 'user',
          googleUser: true,
        });
      } else {
        user.googleUser = true;
        user.save();
      }

      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      return { msg: 'logged in', accessToken: accessToken, refreshToken: refreshToken };
    }
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = googleAuth;
