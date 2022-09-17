import mongoose from "mongoose";

// ! COPIED DELETE
declare var process: {
  env: {
    SESSION_SECRET: string,
    MONGODB_URL: string,
    PORT: string
  }
}

const { MONGODB_URL } = process.env;
console.log("MOG", process.env.PORT);

function dbConnection() {
  mongoose
    .connect(MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,

    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.log("DB ERROR", error);
    });
}

export default dbConnection;
