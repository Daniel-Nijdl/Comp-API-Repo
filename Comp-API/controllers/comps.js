const Comp = require("../models/Comp");
// const { StatusCodes } = require("http-status-codes");
// const { BadRequest, NotFound } = require("../errors")

const getAllComps = async (req, res) => {
  const comps = await Comp.find({}).sort("createdAt");
  res.json({ comps, count: comps.length });
};

const getComp = async (req, res) => {
  const { id: compID } = req.params;

  const comp = await Comp.findOne({ _id: compID });

  res.json({ comp });
};

const createComp = async (req, res) => {
  const comp = await Comp.create(req.body);
  res.json({ comp });
};

const updateComp = async (req, res) => {
  // const {
  //   compCase: compCase,
  //   mobo,
  //   cpu,
  //   gpu,
  //   ram,
  //   ssd,
  //   hdd,
  //   powerSupply,
  //   cooling,
  //   operatingSystem,
  // } = req.body;
  const { id: compID } = req.params;

  // if(!compCase || !mobo || !cpu || !gpu || !ram || !ssd || !hdd || !powerSupply || !cooling || !operatingSystem){

  // }

  const comp = await Comp.findByIdAndUpdate(
    {
      _id: compID,
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.json({ comp })
};

module.exports = { createComp, getAllComps, getComp, updateComp };
