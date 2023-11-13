const app = require('./app');

// podkluchenie k base dannuh mongoDB posle Oleksander nyzhno vstavit' porol' "150487-mO" proekta, megdy ? i / ne zabut' vstavit' nazvanie proekta "mon-regime"
const DB_HOST = "mongodb+srv://Oleksander:150487-mO@cluster0.hwmgdyi.mongodb.net/mon-regime?retryWrites=true&w=majority"
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


