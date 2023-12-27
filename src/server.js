const express = require("express");

const barRoutes = require("./bar/routes");
const commentRoutes = require("./comment/routes");
const rootRoutes = require("./root/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", rootRoutes);
app.use("/bars", barRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
