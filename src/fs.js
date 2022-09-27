const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

fs.readFile("./src/files/temp.txt", (err, data) => {
  if (err) throw err;
  console.log("BUFFER", data);
  console.log("DATA TO STRING: ", data.toString());
});

fs.readFile("./src/files/temp.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("UTF8 FILE: ", data);
});

// path gives current directory path
fs.readFile(path.join(__dirname, "files", "temp.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log("UTF8 FILE with path: ", data);
});

// Overwrite files
fs.writeFile(
  path.join(__dirname, "files", "write.txt"),
  "This is what gets writtten \n",
  (err, data) => {
    if (err) throw err;
    console.log("DATA Written successfully");
  },
);

// append at the end of file
// due to async nature put it inside callback function in writefile
fs.appendFile(
  path.join(__dirname, "files", "write.txt"),
  "This is what gets appended",
  (err, data) => {
    if (err) throw err;
    console.log("DATA appended successfully");
  },
);

// ! FS PROMISES
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "write.txt"),
      "utf-8",
    );
    console.log("DATA IN FSPROMISE:", data);
  } catch (err) {
    console.log(error);
  }
};
fileOps();

// ! For bigger files
const rs = fs.createReadStream("./src/files/lorem.txt", { encoding: "utf-8" });
const ws = fs.createWriteStream("./src/files/new-lorem.txt");

// rs.on("data", (dataChunk) => {
//   ws.writa(dataChunk);
// });

// ! Better than above method
// rs.on("data", (dataChunk) => {
//   ws.writa(dataChunk);
// });
rs.pipe(ws);

process.on("uncaughtException", (err) => {
  console.error("There was uncaught error", err);
  process.exit(1);
});
