// import app from './app.js';

// let PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
// 	console.log(`App is running at ${PORT}`);
// });

import app from './app';

app.get("/", (req, res) => {
	res.send("TESET")
})

app.listen(3000, () => {
	console.log("APP IS RUNNING")
})