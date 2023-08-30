const express = require("express");

const barRoutes = require("./src/bar/routes");
const commentRoutes = require("./src/comment/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/bars", barRoutes);
app.use("/bars", commentRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
