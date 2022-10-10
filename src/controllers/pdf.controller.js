const { request } = require("http");
const { buildPDF, getSamplePDF } = require("../services/pdf.services");

const getPDF = async (req, res) => {
  pdfBuffer = await getSamplePDF();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  return res.send(pdfBuffer);
};

const generatePDF = async (req, res) => {
  const html_string = request.body._string;
  pdfBuffer = await buildPDF(html_string);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  return res.send(pdfBuffer);
};

module.exports = { getPDF, generatePDF };
