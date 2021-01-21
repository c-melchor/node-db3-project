const Schemes = require("../schemes/scheme-model");

async function checkForValidId(req, res, next) {
  const { id } = req.params;
  try {
    const validScheme = await Schemes.findById(id);
    if (validScheme) {
      next();
    } else {
      res.json(null);
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: `Scheme with id ${id} does not exist` });
  }
}

module.exports = checkForValidId;
