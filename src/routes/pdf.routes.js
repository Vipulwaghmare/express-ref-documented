const express = require("express");
const {
  getPDF,
  generatePDF,
  uploadPdfToURL,
} = require("../controllers/pdf.controller");

const pdfRouter = express.Router();

pdfRouter.get("/getPDF", getPDF);
pdfRouter.post("/generatePDF", generatePDF);
pdfRouter.post("/uploadPdfToURL", uploadPdfToURL);

module.exports = pdfRouter;
