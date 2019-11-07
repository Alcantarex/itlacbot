"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.post("/echo", function(req, res) {
  /*var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Ocurrió un problema, vato. Habla de nuevo.";*/
    if (req.body.queryResult.action == "costo") {
      let costo = parseFloat(req.body.queryResult.parameters.costo);
      response = "El costo es de " + costo;
      res.json({
          "fulfillmentText": response
      });
    }
  
  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };
  
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

app.post('/', function (req, res) {
  if (req.body.queryResult.action == "suma") {
      let num1 = parseFloat(req.body.queryResult.parameters.num1);
      let num2 = parseFloat(req.body.queryResult.parameters.num2);
      let sum = num1 + num2;
      response = num1 + " + " + num2 + " es " + sum;
      res.json({
          "fulfillmentText": response
      });
  }
});

app.get('/', (req, res) => {
	res.status(200).send('app is working.')
})

app.listen(port, () => {
	console.log(`🌏 app is running at http://localhost:${port}`)
})

app.listen(process.env.PORT || 8000, function() {
  console.log("app up and listening");
});
