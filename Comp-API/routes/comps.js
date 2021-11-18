const express = require("express");
const router = express.Router();

const {
  createComp,
  getAllComps,
  getComp,
  updateComp,
  deleteComp,
} = require("../controllers/comps");

router.route("/").get(getAllComps).post(createComp);
router.route("/:id").get(getComp).put(updateComp).delete(deleteComp);

// router.get("/", (req, res) => {
//   res.send("Comp Router")
// })

// router.get("/", (req, res) => {
//   res.send('<h1 style="text-align: center">Comp Route Test</h1>')
// })

module.exports = router;
