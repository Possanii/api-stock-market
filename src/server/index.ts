import { env } from "../app/config/env";
import app from "./config";

import "./routes";

app.use((_, res) => {
  return res.status(404).send("Route not found");
});

app.listen(env.API_PORT, () => {
  console.log("🔥 Listening on port " + env.API_PORT);
});
