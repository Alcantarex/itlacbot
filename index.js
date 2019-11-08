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
  var speech = ""; 
  /*speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Ocurrió un problema, vato. Habla de nuevo.";*/
    
    if (req.body.queryResult.action == "saludo") {
      var aSaludo = [
        "¡Hola! ¿En qué te puedo ayudar?",
        "¡Hey! ¿Qué tal? ¿En qué puedo ayudarte?",
        "Hola, ¿En qué puedo ayudarte?",
        "Buenas, ¿Para qué soy bueno?"];
      speech = aSaludo[1];
    }
  
    if (req.body.queryResult.action == "carrera") {
      var aCarreras = [
        "Ingeniería en Sistemas Computacionales",
        "Ingeniería Química",
        "Ingeniería Electrónica",
        "Ingeniería Electromecánica",
        "Ingeniería Industrial",
        "Ingeniería en Gestión Empresarial",
        "Contabilidad",
        "Administración"
      ];
      var aFrases = [
        "En el Instituto Tecnológico de Lázaro Cárdenas, hay 6 Ingenierías y 2 Licenciaturas, y son",
        "Las carreras que hay en el ITLAC son\nIngeniería en Sistemas Computacionales\nIngeniería Química\nIngeniería Electrónica\nIngeniería Electromecánica\nIngeniería Industrial\nIngeniería en Gestión Empresarial\nContabilidad\nAdministración",
        "Mira, existen 6 Ingenierías y 2 Licenciaturas, y son "
      ];
      var sCarreras = "";
      for(var i = 0; i < aCarreras.length(); i++){
        sCarreras = sCarreras + "\n" + aCarreras[i];
      }
      speech = aFrases[1];
    }

    if (req.body.queryResult.action == "costo") {
      var cCosto = 2900;
      var aCosto = [
        "El semeste cuesta $" + cCosto,
        "El precio actual de inscripción semestral es de $" + cCosto,
        "La inscripción tiene un costo de $" + cCosto + ", sin embargo, cada semestre se actualiza el precio.",
        "Actualmente, la inscripción tiene un costo de $" + cCosto];
      speech = aCosto[2];
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

/*app.post('/', function (req, res) {
  if (req.body.queryResult.action == "suma") {
      let num1 = parseFloat(req.body.queryResult.parameters.num1);
      let num2 = parseFloat(req.body.queryResult.parameters.num2);
      let sum = num1 + num2;
      response = num1 + " + " + num2 + " es " + sum;
      res.json({
          "fulfillmentText": response
      });
  }
});*/

app.get('/', (req, res) => {
	res.status(200).send('🌏 Server is working.')
});

app.listen(process.env.PORT || 8000, function() {
  console.log("🌏 app is running up and listening");
});
