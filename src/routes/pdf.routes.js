const express = require("express");
const { getPDF } = require("../controllers/pdf.controller");

const pdfRouter = express.Router();

pdfRouter.get("/getPDF", getPDF);
pdfRouter.post("/generatePDF", generatePDF);

module.exports = pdfRouter;
