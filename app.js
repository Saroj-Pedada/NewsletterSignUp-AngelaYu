const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const mailid = req.body.mailid;
    var data = {
        members: [{
                email_address: mailid,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/e6f6e373f5";
    const options = {
        method: "POST",
        auth: "saroj:adb866c2b1556a709613f0c39cafd4fe7-us21"
    }
    const request = https.request(url,options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running succesfullly on port 3000...");
})

// API Key
// db866c2b1556a709613f0c39cafd4fe7-us21

// List Id
// e6f6e373f5 