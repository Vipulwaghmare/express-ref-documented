const express = require("express");
const { getPDF, generatePDF } = require("../controllers/pdf.controller");

const pdfRouter = express.Router();

pdfRouter.get("/getPDF", getPDF);
pdfRouter.post("/generatePDF", generatePDF);

module.exports = pdfRouter;
