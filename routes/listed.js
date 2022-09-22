const router = require("express").Router();

const Listed = require("../models/Listed");

const { isAuthenticated } = require("../middlewares/authMiddleware");
// Create Listing Status
router.post("/create", isAuthenticated, async (req, res) => {
  // router.post("/create", async (req, res) => {
  try {
    const isExist = await Listed.findOne({ token_id: req.body.token_id });
    const listed = new Listed({
      owner_address: req.body.owner_address,
      token_address: req.body.token_address,
      token_id: req.body.token_id,
      slug: req.body.slug,
      metadata: req.body.metadata,
      isListed: req.body.isListed,
      price: req.body.price,
    });
    if (isExist) {
      // res.status(401).json({ message: "Token Id Already Exists" });
      await Listed.findByIdAndUpdate(
        { _id: isExist._id },
        {
          $set: {
            owner_address: req.body.owner_address,
            token_address: req.body.token_address,
            token_id: req.body.token_id,
            slug: req.body.slug,
            metadata: req.body.metadata,
            isListed: req.body.isListed,
            price: req.body.price,
          },
        }
      );
      res.status(200).json({ message: "Updated Successfully" });
    } else {
      await listed.save();
      res.status(200).json({ message: "Created Successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// Get Listed Cars array
router.get("/get-listed-name", async function (req, res) {
  try {
    let _listed = [];
    if (await Listed.findOne({ slug: "cyclone-gt" }))
      _listed.push("cyclone-gt");
    if (await Listed.findOne({ slug: "class-t" })) _listed.push("class-t");
    if (await Listed.findOne({ slug: "amg-gt" })) _listed.push("amg-gt");
    if (await Listed.findOne({ slug: "f11" })) _listed.push("f11");
    if (await Listed.findOne({ slug: "fantom" })) _listed.push("fantom");
    if (await Listed.findOne({ slug: "jaguar-c-type" }))
      _listed.push("jaguar-c-type");
    res.status(200).json(_listed);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Get Listed Price of Item by Id
router.get("/get-listing/:token_id", async function (req, res) {
  try {
    const _record = await Listed.findOne({ token_id: req.params.token_id });
    res.status(200).json(_record);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Upadate isListed Status
router.put(
  "/update-listing-status/:token_id",
  isAuthenticated,
  async (req, res) => {
    try {
      const wallet = req.userWallet;
      const isListed = await Listed.find({ owner_address: wallet });

      if (isListed) {
        const isExist = isListed.find(
          (record) => record.token_id == req.params.token_id
        );
        if (isExist) {
          await Listed.findByIdAndUpdate(
            { _id: isExist._id },
            {
              $set: {
                isListed: req.body.isListed,
              },
            }
          );
          res.status(200).json({ message: "Update Successfully" });
        } else {
          res.status(401).json({ message: "Invalid Token Id" });
        }
      } else {
        res.status(401).json({ message: "Record not exist" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
// Get car by slug
router.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const list = await Listed.find({ slug: slug });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
