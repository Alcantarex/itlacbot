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
  var dFecha = new Date();
  /*speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Ocurrió un problema, vato. Habla de nuevo.";*/
    //*******************************************************************************************************/
    //SALUDO --------------------------------------------------
    if (req.body.queryResult.action == "saludo") {
      var sSaludo = "";
      var iValue = Math.round(Math.random()*2);
      var aSaludoUno = ["Buenos días", "Buenas tardes", "Buenas noches"];
      var aSaludoDos = ["¡Hola!", "¡Hey!", "¡Buenas!"];
      if(iValue == 1){
        if(dFecha.getHours() >= 0 && dFecha.getHours() < 12) sSaludo = aSaludoUno[0];
        else if(dFecha.getHours() >= 12 && dFecha.getHours() < 20) sSaludo = aSaludoUno[1];
        else if(dFecha.getHours() >= 20 && dFecha.getHours() <= 24) sSaludo = aSaludoUno[2];        
      } else {
        sSaludo = aSaludoDos[ Math.round(Math.random()*aSaludoDos.length) ];
      }
      var aSaludoTres = [
        "¿En qué te puedo ayudar?", "¿Qué tal? ¿En qué puedo ayudarte?", "¿En qué puedo ayudarte?",
        "¿En qué puedo ayudarte?", "¿Para qué soy bueno?", "¿Qué se le ofrece?"];      
      speech = sSaludo + ", " + aSaludoTres[ Math.round(Math.random()*aSaludoTres.length) ];
    //CARRERA --------------------------------------------------
    } else if (req.body.queryResult.action == "carrera") {
      var aCarreras = [
        "Ingeniería en Sistemas Computacionales",
        "Ingeniería Química",
        "Ingeniería Electrónica",
        "Ingeniería Electromecánica",
        "Ingeniería Industrial",
        "Ingeniería en Gestión Empresarial",
        "Contabilidad",
        "y Administración"
      ];
      var aFrases = [
        "En el Instituto Tecnológico de Lázaro Cárdenas, hay 6 Ingenierías y 2 Licenciaturas, y son",
        "Las carreras que hay en el ITLAC son ",
        "Mira, existen 6 Ingenierías y 2 Licenciaturas, y son "
      ];
      var sCarreras = "";
      var iTotalCarreras = aCarreras.length;
      for(var i = 0; i < iTotalCarreras; i++){
        sCarreras = sCarreras + "\n" + aCarreras[i];
      }
      speech = aFrases[ Math.round(Math.random()*aFrases.length) ] + "\n" + sCarreras;
    //COSTO --------------------------------------------------
    } else if (req.body.queryResult.action == "costo") {
      var cCosto = 2900;
      var aCosto = [
        "El semeste de inscripción cuesta $" + cCosto,
        "El precio actual de inscripción semestral es de $" + cCosto,
        "La inscripción tiene un costo de $" + cCosto + ", sin embargo, cada semestre se actualiza el precio.",
        "Actualmente, en el " + dFecha.getFullYear() + " la inscripción tiene un costo de $" + cCosto,
        "Mira, el semeste de inscripción tiene un costo de $" + cCosto + ", a partir de ahí, cada semestre siguiente se va reduciendo cada $100"];
      speech = aCosto[ Math.round(Math.random()*aCosto.length) ];
    //ERROR --------------------------------------------------
    } else {
      speech = "Ocurrió un problema. Hable de nuevo, por favor.";
    }
    //*******************************************************************************************************/
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

app.get('/', (req, res) => {
  var html = 
  "<html>"+
    "<h1>🌏 ITLACbot's Server is working</h1>"+
    "<h3>ITLACbot by Alcantara & Cuevas. Copyright © 2019, ITLACbot. Todos los derechos reservados.</h3>"+
  "</html>";
  
	res.status(200).send(html);
});

app.listen(process.env.PORT || 8000, function() {
  console.log("🌏 app is running up and listening");
});
