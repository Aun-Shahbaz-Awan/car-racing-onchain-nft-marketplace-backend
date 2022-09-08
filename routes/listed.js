const router = require("express").Router();

const Listed = require("../models/Listed");

const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const listed = new Listed({
      address: req.body.address,
      token_Id: req.body.token_Id,
      name: req.body.Name,
      slug: req.body.Slug,
      isListed: req.body.isListed,
      price: req.body.price,
    });

    await listed.save();

    res.status(200).json({ message: "Created Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:token_Id", isAuthenticated, async (req, res) => {
  try {
    const wallet = req.userWallet;
    const isListed = await Listed.findOne({ address: wallet });
    if (isListed) {
      const isExist = isListed.token_Id == req.params.token_Id;
      if (isExist) {
        await Listed.findByIdAndUpdate(
          { _id: isListed._id },
          {
            $set: {
              isListed: req.body.isListed,
            },
          }
        );

        res.status(200).json({ message: "Update Successfully" });
      }
    } else {
      res.status(401).json({ message: "Invalid Token Id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:slug", isAuthenticated, async (req, res) => {
  try {
    const slug = req.params.slug;
    const list = await Listed.findOne({ Slug: slug });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
