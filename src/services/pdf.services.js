const html_to_pdf = require("html-pdf-node");
const { Blob } = require("buffer");
const path = require("path");
const fs = require("fs");

const buildPDF = async (html_string) => {
  let options = { format: "A4" };
  let file = { content: html_string };
  const pdfBuffer = await html_to_pdf.generatePdf(file, options);
  // Save pdf in file system
  // fs.writeFileSync("buffer.pdf", pdfBuffer, "binary");
  return pdfBuffer;
};

const getSamplePDF = async () => {
  const template = fs.readFileSync(path.join(__dirname, "index.html"), {
    encoding: "utf8",
  });
  const pdfBuffer = await buildPDF(template);
  return pdfBuffer;
};

module.exports = {
  buildPDF,
  getSamplePDF,
};
