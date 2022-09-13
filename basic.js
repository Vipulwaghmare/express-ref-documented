// const express = require("express");
const fileUpload = require("express-fileupload");
// require("dotenv").config({ path: "./config/.env" });
// const PORT = process.env.PORT || 8080;
// Swagger related
// console.log(process.env.PORT);

// const app = express();
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(express.json()); // body parse prebuilt in express
app.use(fileUpload());

// Test basic
app.get("/api/v1/instagram-test", (req, res) => {
  res.json({
    username: "vipul",
    followers: "200",
    follows: "20",
  });
});

app.get("/api/v1/array", (req, res) => {
  const courses = [
    {
      username: "vipul",
      followers: "200",
      follows: "20",
    },
  ];
  res.send(courses);
});

courses = [
  { id: 1, name: "Something", price: 1 },
  { id: 2, name: "something esle", price: 3 },
  { id: 3, name: "something e333sle", price: 3 },
];
app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find(
    (course) => parseInt(req.params.courseId) === course.id,
  );
  res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  courses.push(req.body);
  res.send(courses);
});

app.get("/api/v1/courseQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/img-upload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.status(400).send("Failed");
  });
  res.send(file);
});

app.post("/api/v1/:id", ({ body, params, query }, res) => {
  res.status(200).send(params.id);
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
