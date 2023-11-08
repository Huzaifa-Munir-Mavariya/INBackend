const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors())
//Available Routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

app.listen(port, () => {
    console.log("Listening to port no "+port)
})


