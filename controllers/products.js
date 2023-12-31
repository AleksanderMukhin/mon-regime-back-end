const Product = require("../models/product");

const { HttpError, ctrlWrapper } = require("../helpers");

// function s decoratorom
const getAll = async (req, res) => {
  const result = await Product.find();
  res.json(result);
}

// function bez decoratora
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const result = await Product.findOne({ _id: id });
    const result = await Product.findById(id);
    if (!result) {
      throw HttpError(404, "Not founded")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res) => {
  const result = await Product.creat(req.body);
  res.status(201).json(result);
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndRemove(id);
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
  const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
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