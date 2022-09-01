const router = require("express").Router();

const Attribute = require("../models/Attribute");

router.get("/", (req, res) => {
  res.send("Hello Work");
});

router.get("/get/:tokenId", async (req, res) => {
  try {
    const _record = await Attribute.findOne({ tokenId: req.params.tokenId });
    res.status(200).json(_record);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    console.log("Res:", req.body);
    const tokenId = await Attribute.findOne({ tokenId: req.body.tokenId });
    if (tokenId != null) {
      res.status(200).json({ message: "Token already exist!" });
    } else {
      const _attribute = new Attribute({
        tokenId: req.body.tokenId,
        level: req.body.level,
        damage: req.body.damage,
        throttle: req.body.throttle,
        earn: req.body.earn,
        nitro: req.body.nitro,
        tire: req.body.tire,
      });
      const _resp = await _attribute.save();
      res.status(200).json(_resp);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:tokenId", async (req, res) => {
  try {
    const _attribute = await Attribute.findOne({ tokenId: req.params.tokenId });
    if (_attribute) {
      const _update = await Attribute.findByIdAndUpdate(
        { _id: _attribute._id },
        {
          $set: req.body,
        }
      );
      if (_update) {
        res.status(200).json({ message: "Updated" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
