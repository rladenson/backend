const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 3000;

class Token {
  constructor(id) {
    this.id = id;
    this.created = new Date();
    this.lastUsed = new Date();
  }
}

let tokens = [];

const tokenChecker = setInterval(() => {
  tokens = tokens.filter((token) => Date.now() - token.lastUsed <= 20 * 1000);
}, 2000);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Pong");
});
app.get("/token", (req, res) => {
  let token;
  do {
    token = Math.random().toString(36).substring(2);
  } while (token.length === 0 || tokens.indexOf(token) !== -1);
  token = new Token(token);
  tokens.push(token);
  res.send(token);
});
app.get("/tokens", (req, res) => {
  res.send(tokens);
});
