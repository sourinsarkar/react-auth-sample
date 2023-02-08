const db = require("../../db");
const User = require("../../schemas/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { sendEmail } = require("../../utils/sendEmail");

module.exports.signup = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    // Getting data from the request
    const { email, password, createdAt } = req.body;

    // Connecting the Database (This is a custom func, be aware of that it is not a built-in func of the packages)
    await db.connect();

    const isThereAlready = await User.findOne({ email });

    // If there is a user with the same email, then stop the signing-up process.
    if (isThereAlready) {
      return res.status(409).send({
        result: "duplicate error",
        message: "There is already an account with that email.",
      });
    }

    // If there is no duplicate error, then hash the raw password
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = v4();

    // Sending user to the Database
    const user = new User({
      email,
      password: hashedPassword,
      createdAt,
      signedIn: createdAt,
      verificationToken,
    });

    await user.save();

    // Sending verification token to the email
    try {
      await sendEmail({
        to: email,
        from: "info@digicafes.com",
        subject: "Please verify your email",
        text: `
        Thanks for signing up! To verify your email, click here:
        https://react-authentication-nine.vercel.app/verify/${verificationToken}
        `,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }

    // Generating jwt token to allow user to use the application
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Sending response to the request
    res.status(200).send({
      token,
    });

    // Disconnecting from the database
    return await db.disconnect();
  },
};
