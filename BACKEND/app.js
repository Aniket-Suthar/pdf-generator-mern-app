
const { dbconnect } = require("./config/connection")
const express = require("express")
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

app.use(cors());

// MongoDB setup
dbconnect();

// Middleware setup
app.use(bodyParser.json());

// Use routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


