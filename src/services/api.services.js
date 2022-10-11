const fetch = require("node-fetch");
const FormData = require("form-data");
// https://www.npmjs.com/package/node-fetch/v/2.6.1

const get_request = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const post_request = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
  return await response.json();
};

// form_data : key value pairs for form fields
// file_data : key value pair, file_name: buffer_data
const form_data_request = async (url, form_data, file_data) => {
  const form = new FormData();

  Object.entries(form_data).forEach((item) => {
    // form.append("name", "value")
    form.append(item[0], item[1]);
  });
  Object.entries(file_data).forEach((item) => {
    // form.append("file", buffer, "filename.pdf");
    form.append("file", item[1], item[0]);
  });

  const options = {
    method: "POST",
    headers: form.getHeaders(),
    body: form,
  };
  const response = await fetch(url, options);
  return await response.json();
};

module.exports = {
  get_request,
  post_request,
  form_data_request,
};
