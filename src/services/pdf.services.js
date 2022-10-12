const html_to_pdf = require("html-pdf-node");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

// Generates pdf from html_string
const buildPDF = async (html_string) => {
  let options = { format: "A4" };
  let file = { content: html_string };
  const pdfBuffer = await html_to_pdf.generatePdf(file, options);
  // Save pdf in file system
  // fs.writeFileSync("buffer.pdf", pdfBuffer, "binary");
  return pdfBuffer;
};

const getSamplePDF = async () => {
  const template_path = path.join(
    __dirname,
    "..",
    "views",
    "templates",
    "index.html",
  );

  const template = fs.readFileSync(template_path, "utf-8");
  return await buildPDF(template);
};

// converts ejs template to string
const fill_html_to_pdf = async (template_name, pdf_data) => {
  const template_path = path.join(
    __dirname,
    "..",
    "views",
    "templates",
    template_name, // index.ejs
  );

  const ejs_string = fs.readFileSync(template_path, "utf-8");
  const html_string = ejs.render(ejs_string, pdf_data);
  return await buildPDF(html_string);
};

module.exports = {
  buildPDF,
  getSamplePDF,
  fill_html_to_pdf,
};
