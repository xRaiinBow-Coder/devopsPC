const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./index");
const Student = mongoose.model("Student");

beforeAll(async () => {
  await mongoose.connect("mongodb://20.0.153.128:10999/studentsnDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Student.deleteMany({});
});

describe("Student API", () => {
  it("should fetch all students", async () => {
    await Student.create({ name: "John", age: 20, course: "Math" });

    const res = await request(app).get("/students");
    expect(res.status).toBe(200);
    expect(res.text).toContain("John"); 
  });

  it("should create a new student", async () => {
    const res = await request(app)
      .post("/student")
      .type("form")
      .send({ name: "Alice", age: 22, course: "Biology" });

    expect(res.status).toBe(302); 
    const student = await Student.findOne({ name: "Alice" });
    expect(student).toBeTruthy();
    expect(student.age).toBe(22);
  });

  it("should fetch a single student", async () => {
    const student = await Student.create({ name: "Tom", age: 25, course: "Physics" });
    const res = await request(app).get(`/student/${student._id}`);

    expect(res.status).toBe(200);
    expect(res.text).toContain("Tom");
  });

  it("should update a student", async () => {
    const student = await Student.create({ name: "Jake", age: 30, course: "History" });
    const res = await request(app)
      .put(`/student/${student._id}?_method=PUT`)
      .type("form")
      .send({ name: "Jake Updated", age: 31, course: "Philosophy" });

    expect(res.status).toBe(302);
    const updatedStudent = await Student.findById(student._id);
    expect(updatedStudent.name).toBe("Jake Updated");
  });

  it("should delete a student", async () => {
    const student = await Student.create({ name: "Emily", age: 24, course: "Art" });
    const res = await request(app)
      .delete(`/student/${student._id}?_method=DELETE`)
      .type("form");

    expect(res.status).toBe(302);
    const found = await Student.findById(student._id);
    expect(found).toBeNull();
  });
});
