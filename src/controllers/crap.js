const crapService = require("../services/crap");

const create = async (req, res, next) => {
  try {
    const { title, description, status, lat, long, address, date, time } =
      req.sanitizedBody;

    console.log(`Authed User: `, req.user);

    const newCrap = await crapService.create(
      {
        title,
        description,
        status,
        lat,
        long,
        address,
        date,
        time,
        owner: req.user.id,
      },
      req.files
    );
    res.status(201).json({
      data: newCrap,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const craps = await crapService.getAll();
    res.status(200).json({
      data: craps,
      isFromChrome: req.isFromChrome,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const crap = await crapService.getById(req.params.id);
    res.status(200).json({
      data: crap,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const foundCrap = await crapService.update(req.params.id, req.body);
    res.status(200).json({
      data: foundCrap,
    });
  } catch (error) {
    next(error);
  }
};

const interested = async (req, res, next) => {
  try {
    const updatedCrap = await crapService.update(req.params.id, {
      status: "INTERESTED",
      buyer: req.user.id,
    });

    res.status(200).json({ data: updatedCrap });
  } catch (error) {
    next(error);
  }
};

const available = async (req, res, next) => {
  try {
    const updatedCrap = await crapService.update(req.params.id, {
      status: "AVAILABLE",
    });

    res.status(200).json({ data: updatedCrap });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedCrap = await crapService.deleteOne(req.params.id);
    res.status(200).json({
      data: deletedCrap,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  available,
  interested,
  deleteOne,
};
