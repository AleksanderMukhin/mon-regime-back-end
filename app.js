const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv")


// const moment = require('moment')

const productsRouter = require('./routes/api/products')

dotenv.config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// cors nuzhen chtobu backend prinimal zapros ne tolko s localhost3000 no i s frontend s drygim adressom
app.use(cors())
app.use(logger(formatsLogger))
app.use(express.json())

app.use("/products", productsRouter)


app.use((req, res) => {
  res.status(404).json({
    message: "Not founded"
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
})

module.exports = app
