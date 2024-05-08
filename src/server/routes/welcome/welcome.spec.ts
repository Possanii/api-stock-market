import supertest from "supertest";
import app from "../../config";

test("GET /", async () => {
  await supertest(app)
    .get("/")
    .then(() => {
      expect("Hello from api_transacional");
    });
});
