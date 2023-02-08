const { sendEmail } = require("../utils/sendEmail");

module.exports.testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: req.body.email,
        from: "info@digicafes.com",
        subject: "This is a test email",
        text: "If you're reading this, it's working!",
        html: `<p>If you're reading this, it's working!</p>`,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
