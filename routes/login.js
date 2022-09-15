const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  try {
    const wallet = req.body.wallet;
    if (wallet != null) {
      let token = jwt.sign(wallet, process.env.JWT_SECRET);
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          message: "Login successful",
          token,
        });
    } else {
      res.status(401).json({ message: "Wallet address is required" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/logout", (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "logout",
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
