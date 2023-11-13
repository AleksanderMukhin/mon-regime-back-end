const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require('nanoid')

const productsPath = path.join(__dirname, "products.json")

const getAll = async () => {
  const data = await fs.readFile(productsPath)
  return JSON.parse(data);
}

const getById = async (id) => {
  const products = await getAll();
  const result = products.find(item => item._id.$oid === id);
  return result || null;
}

const addProduct = async (data) => {
  const products = await getAll();
  const newProduct = {
    _id: { $oid: nanoid() },
    ...data,
  }
  products.push(newProduct)
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2))
  return newProduct;
}

const updateById = async (id, data) => {
  const products = await getAll();
  const index = products.findIndex(item => item._id.$oid === id);
  if (index === -1) {
    return null;
  }
  products[index] = { id, ...data };
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  return products[index];
}

const deleteById = async (id) => {
  const products = await getAll();
  const index = products.findIndex(item => item._id.$oid === id);
  if (index === -1) {
    return null;
  }
  const [result] = products.splice(index, 1);
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  return result;
}

module.exports = {
  getAll,
  getById,
  addProduct,
  updateById,
  deleteById
}