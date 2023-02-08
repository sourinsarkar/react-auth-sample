const db = require("../db");
const User = require("../schemas/User");

module.exports.createGoogleUser = async ({ oauthUserInfo }) => {
  // OAuth comes from the user google account
  const {
    id: googleId,
    verified_email: isVerified,
    email,
    given_name: firstName,
    family_name: lastName,
  } = oauthUserInfo;

  await db.connect();

  // Checking if user there is or not
  const existingUser = await User.findOne({ email });

  //  If there is user with the same email address then find it and update
  if (existingUser) {
    const result = await User.findOneAndUpdate(
      { email },
      { $set: { googleId, isVerified } },
      { returnOriginal: false }
    );

    await db.disconnect();

    return result;
  } else {
    //  Else create a new user with oAuth infos
    const user = new User({
      email,
      googleId,
      isVerified,
      info: { firstName, lastName },
      createdAt: Date.now(),
      signedIn: Date.now(),
    });

    await user.save();

    await db.disconnect();

    return user;
  }
};
