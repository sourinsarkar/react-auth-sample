const db = require("../db");
const { v4 } = require("uuid");
const User = require("../schemas/User");
const { sendEmail } = require("../utils/sendEmail");

module.exports.forgotPassword = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    // Get the user email from params
    const { email } = req.params;

    await db.connect();

    // Generate a unique token
    const passwordResetToken = v4();

    // Send the token to the user database
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { passwordResetToken } }
    );

    // If token sent then send email with token
    if (user.passwordResetToken) {
      try {
        await sendEmail({
          to: email,
          from: "info@digicafes.com",
          subject: "Password Reset",
          text: `
                To reset your password, click this link:
                https://react-authentication-nine.vercel.app/reset-password/${passwordResetToken}
                `,
        });
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    }

    res.sendStatus(200);

    await db.disconnect();
  },
};
