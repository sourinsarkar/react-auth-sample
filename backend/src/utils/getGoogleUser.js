const { oAuthGoogleClient } = require("./oAuthClient");
const axios = require("axios");

const getAccessAndBearerTokenUrl = ({ accessToken }) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

module.exports.getGoogleUser = async ({ code }) => {
  const { tokens } = await oAuthGoogleClient.getToken(code);
  const response = await axios.get(
    getAccessAndBearerTokenUrl({ accessToken: tokens.access_token }),
    { headers: { Authorization: `Bearer ${tokens.id_token}` } }
  );

  return response.data;
};
