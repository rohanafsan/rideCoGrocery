const express = require("express");

const routes = require("./routes/routes");

const cors = require("cors");

const port = 8000;

const app = express();

app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use(cors());

// Routes for the API
app.use(routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
