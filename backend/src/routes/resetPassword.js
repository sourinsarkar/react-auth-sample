const db = require("../db");
const bcrypt = require("bcrypt");
const User = require("../schemas/User");

module.exports.resetPassword = {
  path: "/api/users/reset-password/:passwordResetToken",
  method: "put",
  handler: async (req, res) => {
    // Get the token and password from params
    const { passwordResetToken } = req.params;
    const { password } = req.body;

    await db.connect();

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Replace the new hashed password instead of old password
    const result = await User.findOneAndUpdate(
      { passwordResetToken },
      { $set: { password: hashedPassword }, $unset: { passwordResetToken } }
    );

    if (!result) {
      return res.sendStatus(404);
    }

    res.sendStatus(200);

    await db.disconnect();
  },
};
