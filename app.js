const express = require("express");
const parser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/newsletter", function (request, response) {
  const name = request.body.userName;
  const phone = request.body.userPhone;
  const email = request.body.userEmail;

  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          PHONE: phone,
        }
      }
    ]
  };

  const url = "https://us18.api.mailchimp.com/3.0/lists/f304443c16";

  const options = {
      method: "POST",
      auth: "najib:d0bac2c74a3b5a82aca5308655c3217a-us18"
  };

  const jsonData = JSON.stringify(data);

  const req = https.request(url, options, function (res) {
   
    if (res.statusCode === 200 ) {
      response.sendFile(__dirname + "/success.html");
    } else {
      response.sendFile(__dirname +"/failure.html");
    }
   
    res.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  req.write(jsonData);
  req.end();

});

app.post("/failure", function (request, response) {
  response.redirect("/");
});














app.listen(process.env.PORT || 3000, function (request, response) {
  console.log("Server runing on port 3000");
});


//List Id
