const { request } = require("http");
const { form_data_request } = require("../services/api.services");
const {
  buildPDF,
  getSamplePDF,
  fill_html_to_pdf,
} = require("../services/pdf.services");

// sends sample pdf which generates from html
const getPDF = async (req, res) => {
  pdfBuffer = await getSamplePDF();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  return res.send(pdfBuffer);
};

// generates pdf from html string received from request
const generatePDF = async (req, res) => {
  const { html_string } = req.body;
  const pdfBuffer = await buildPDF(html_string);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  return res.send(pdfBuffer);
};

// uploads pdf to url
const uploadPdfToURL = async (req, res) => {
  const pdf_data = {
    student: {
      name: "Reddy Sai",
      couse_name: "Software Engineering Training",
      grade: "55.7",
      completion_date: "22-Feb-2019",
    },
  };
  const pdfBuffer = await fill_html_to_pdf("index.ejs", pdf_data);

  const url = "http://localhost:1000/form-data";

  const form_data = {
    fname: "vipul",
    lname: "waghmare",
  };

  const file_data = {
    "sample1.pdf": pdfBuffer,
  };
  const resp = await form_data_request(url, form_data, file_data);

  return res.json(resp);
};

module.exports = { getPDF, generatePDF, uploadPdfToURL };
