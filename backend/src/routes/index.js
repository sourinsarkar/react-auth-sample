const { login } = require("./auth/login");
const { signup } = require("./auth/signup");
const { forgotPassword } = require("./forgotPassword");
const { getGoogleOAuthUrlRoute } = require("./googleOAuth");
const { googleOAuthCallback } = require("./googleOAuthCallback");
const { resetPassword } = require("./resetPassword");
const { testEmailRoute } = require("./testEmailRoute");
const { testRoute } = require("./testRoute");
const { updateUserInfo } = require("./updateUserInfo");
const { verifyEmail } = require("./verifyEmail");

module.exports.routes = [
  testRoute,
  signup,
  login,
  updateUserInfo,
  testEmailRoute,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getGoogleOAuthUrlRoute,
  googleOAuthCallback,
];
