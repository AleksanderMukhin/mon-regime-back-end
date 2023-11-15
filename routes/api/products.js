const express = require('express');
const { validateBody } = require("../../middelwares");
const schemas = require("../../schemas/products")

const router = express.Router();

const { getAll, getById, addProduct, deleteById, updateById } = require("../../controllers/priducts")

router.get("/", getAll)

router.get("/:id", getById)

// router.post('/', validateBody(schemas.addSchema), addProduct)

// router.delete('/:id', deleteById)

// router.put('/:id', validateBody(schemas.addSchema), updateById)

module.exports = router
