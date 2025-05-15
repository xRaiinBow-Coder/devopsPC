const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./index");

describe("GET /", () => {
  it("should redirect to /students", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe("/students");
  });
});

// Close the MongoDB connection after all tests to prevent Jest from hanging
afterAll(async () => {
  await mongoose.connection.close();
});
