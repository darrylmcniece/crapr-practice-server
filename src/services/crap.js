const Crap = require("../models/Crap");
const imageService = require("./imageService");

const create = async (body, files) => {
  console.log(`Body from Service ---`, body);
  console.log(body.coordinates);
  const newLocation = {
    type: "Point",
    coordinates: [Number(body.long), Number(body.lat)],
  };

  const newSuggestion = {
    address: body.address,
    date: body.date,
    time: body.time,
  };

  const urls = await imageService.uploadMany(files);

  console.log(`Body Owner Service ---- `);
  const newCrap = new Crap({
    title: body.title,
    description: body.description,
    status: body.status,
    location: [newLocation],
    suggestion: [newSuggestion],
    images: urls,
    owner: body.owner,
    buyer: body.buyer,
  });

  await newCrap.save();
  return newCrap;
};

const getAll = async () => {
  const allCraps = await Crap.find({})
    .populate("owner", "name")
    .select("-buyer");
  return allCraps;
};

const getById = async (id) => {
  const crap = await Crap.findById(id)
    .populate("owner", "name")
    .select("-buyer");

  if (!crap) throw new Error(`crap with id ${id} not found`);

  return crap;
};

const update = async (id, body) => {
  const foundCrap = await Crap.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!foundCrap) throw new Error(`crap with id ${id} not found`);

  for (const key of [
    "title",
    "description",
    "suggestion",
    "location",
    "status",
    "owner",
    "buyer",
  ]) {
    if (body[key]) foundCrap[key] = body[key];
  }
  return foundCrap;
};

const deleteOne = async (id) => {
  const deletedCrap = await Crap.findByIdAndDelete(id);

  if (!deletedCrap) throw new Error(`crap with id ${id} not found`);

  return deletedCrap;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteOne,
};
