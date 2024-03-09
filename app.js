const express = require("express");
const {
  logErrors,
  clientErrorHandler
} = require("./errorHandlers");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/message", (req, res, next) => {
  try {
    res.send("Message from server");
  } catch (e) {
    next(e);
  }
});
app.post("/message", (req, res, next) => {
  try {
    console.log(req.body);
    res.send(`Your message: ${req.body.message}`);
  } catch (e) {
    next(e);
  }
});

app.use(logErrors);
app.use(clientErrorHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
