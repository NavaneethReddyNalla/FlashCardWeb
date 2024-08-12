const express = require("express");
const userRouter = require("./routes/user");
const cardRouter = require("./routes/card");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use("/user", userRouter);
app.use("/cards", cardRouter);

app.get("/test", (_, res) => res.send({ message: "Success" }));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
