const express = require('express');
const { validateBody, authenticate } = require("../../middelwares");
const schemas = require("../../schemas/products")

const router = express.Router();

const { getAll, getById, addProduct, deleteById, updateById } = require("../../controllers/priducts")

router.get("/", authenticate, getAll)

router.get("/:id", authenticate, getById)

router.post('/', authenticate, validateBody(schemas.addSchema), addProduct)

router.delete('/:id', authenticate, deleteById)

router.put('/:id', authenticate, validateBody(schemas.addSchema), updateById)

module.exports = router
