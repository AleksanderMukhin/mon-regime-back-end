const app = require('./app');

const { DB_HOST } = require('./config')

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST).then(() => {
  // zapuskaem server esli podkluchilis' k bd
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
}).catch((error) => {
  console.log(error.message)
  // eta comanda zakruvaet zapyshennui process
  process.exit(1);
})


