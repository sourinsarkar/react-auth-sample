const { oAuthGoogleClient } = require("./oAuthClient");

module.exports.getGoogleOAuthUrl = () => {
  // We defining scopes to notify the google client that we only want the user's email and common infos
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oAuthGoogleClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
};
