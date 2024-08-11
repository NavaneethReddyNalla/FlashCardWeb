const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

app.get("/test", (_, res) => res.send({ message: "Success" }));

app.listen(port, () => console.log(`Server started on port ${port}`));
