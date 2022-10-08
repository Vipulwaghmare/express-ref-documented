//  ! duplicate
const whitelist = [
  "https://www.youtube.com",
  "http://localhost:3000",
  "http://127.0.0.1:3001",
];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.headers("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
