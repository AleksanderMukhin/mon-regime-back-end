const products = require("../models/products");

const { HttpError, ctrlWrapper } = require("../helpers");

// function s decoratorom
const getAll = async (req, res) => {
  const result = await products.getAll();
  res.json(result);
}

// function bez decoratora
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await products.getById(id);
    if (!result) {
      throw HttpError(404, "Not founded")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res) => {
  const result = await products.addProduct(req.body);
  res.status(201).json(result);
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await products.deleteById(id);
  if (!result) {
    throw HttpError(404, "Not founded")
  }
  res.json({
    message: "Delete success"
  })
}

const updateById = async (req, res) => {
  // berem iz params id
  const { id } = req.params;
  const result = await products.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not founded")
  }
  res.json(result)
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addProduct: ctrlWrapper(addProduct),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
}