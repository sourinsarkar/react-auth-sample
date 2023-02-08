const db = require("../../db");
const User = require("../../schemas/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    // Getting data from the request
    const { email, password, signedIn } = req.body;

    // Connecting the Database (This is a custom func, be aware of that it is not a built-in func of the packages)
    await db.connect();

    const user = await User.findOne({ email });

    // If there is not a user with that email, then stop the logging-in process.
    if (!user) {
      return res
        .status(401)
        .send({ result: "not found", message: "User not found." });
    }

    // Comparing the passwords that come from the request with the database
    const isCorrect = await bcrypt.compare(password, user.password);

    // If the password is correct then generate a token to allow user to use the application
    if (isCorrect) {
      await User.findByIdAndUpdate(user._id, {
        signedIn,
      });

      const token = jwt.sign(
        {
          id: user._id,
          createdAt: user.createdAt,
          signedIn,
          info: user.info,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Sending response to the request
      res.status(200).send({
        token,
      });
    }

    return await db.disconnect();
  },
};
