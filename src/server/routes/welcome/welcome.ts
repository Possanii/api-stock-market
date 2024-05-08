import app from "../../config";

app.get("/", (req, res) => {
  return res.send("Hello from api_transacional");
});
