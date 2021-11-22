const Comp = require("../models/Comp");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const getAllComps = async (req, res) => {
  // const comps = await Comp.find({ createdBy: req.user.userID }).sort(
  //   "createdAt"
  // );
  const comps = await Comp.find({ }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ comps, count: comps.length });
};

const getComp = async (req, res) => {
  const { userID } = req.user;
  const { id: compID } = req.params;

  const comp = await Comp.findOne({
    _id: compID,
    createdBy: userID,
  });

  if (!comp) {
    throw new NotFound(`No computer with id ${compID}`);
  }

  res.status(StatusCodes.OK).json({ comp });
};

const createComp = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const comp = await Comp.create(req.body);
  res.status(StatusCodes.CREATED).json({ comp });
};

const updateComp = async (req, res) => {
  const {
    compCase: compCase,
    mobo,
    cpu,
    gpu,
    ram,
    ssd,
    hdd,
    powerSupply,
    cooling,
    cpuCooling,
    operatingSystem,
  } = req.body;
  const { userID } = req.user;
  const { id: compID } = req.params;

  if (
    !compCase ||
    !mobo ||
    !cpu ||
    !gpu ||
    !ram ||
    !ssd ||
    !hdd ||
    !powerSupply ||
    !cooling ||
    !cpuCooling ||
    !operatingSystem
  ) {
    throw new BadRequest("All computer part fields must be filled");
  }

  const comp = await Comp.findByIdAndUpdate(
    {
      _id: compID,
      createdBy: userID,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if(!comp){
    throw new NotFound(`no computer with the id ${compID}`);
  }

  res.status(StatusCodes.OK).json({ comp });
};

const deleteComp = async (req, res) => {
  const {
    user: { userID },
    params: { id: compID },
  } = req;

  const comp = await Comp.findByIdAndRemove({
    _id: compID,
    createdBy: userID,
  });

  if(!comp){
    throw new NotFound(`no computer with id ${compID}`)
  }
  res.status(StatusCodes.OK).json({ comp });
};

module.exports = { createComp, getAllComps, getComp, updateComp, deleteComp };
