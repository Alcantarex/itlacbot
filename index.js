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
    //SALUDO -------------------------------------------------- FUNCIONAL 100%
    if (req.body.queryResult.action == "saludo") {
      var sSaludo = "";
      var iValue = Math.round(Math.random()*2);
      var aSaludoUno = ["Buenos días", "Buenas tardes", "Buenas noches"];
      var aSaludoDos = ["¡Hola!", "¡Hey!", "¡Buenas!"];
      if(iValue == 1){
        if(dFecha.getHours() >= 0 && dFecha.getHours() < 12) sSaludo = aSaludoUno[2];
        else if(dFecha.getHours() >= 12 && dFecha.getHours() < 20) sSaludo = aSaludoUno[0];
        else if(dFecha.getHours() >= 20 && dFecha.getHours() <= 24) sSaludo = aSaludoUno[1];        
      } else {
        sSaludo = aSaludoDos[ Math.round(Math.random()*(aSaludoDos.length-1)) ];
      }
      var aSaludoTres = [
        "¿En qué te puedo ayudar?", "¿Qué tal? ¿En qué puedo ayudarte?", "¿En qué puedo ayudarte?",
        "¿En qué puedo ayudarte?", "¿Para qué soy bueno?", "¿Qué se le ofrece?"];      
      speech = sSaludo + ", " + aSaludoTres[ Math.round(Math.random()*(aSaludoTres.length-1))];
    //CARRERA -------------------------------------------------- FUNCIONAL 100%
    } else if (req.body.queryResult.action == "carrera") {
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
      var aBachilleratos = [
        "Físico-Matemático",
        "Químico-Biólogo",
        "Físico-Matemático",
        "Físico-Matemático",
        "Físico-Matemático, Químico-Biólogo o Económico-Administrativo",
        "Económico-Administrativo",
        "Económico-Administrativo",
        "Económico-Administrativo"
      ];
      var aFrases = [
        "En el Instituto Tecnológico de Lázaro Cárdenas, hay 6 Ingenierías y 2 Licenciaturas, y son",
        "Las carreras que hay en el ITLAC son ",
        "Mira, existen 6 Ingenierías y 2 Licenciaturas, y son "
      ];
      var sCarreras = "";
      var iTotalCarreras = aCarreras.length;
      
      if(req.body.queryResult.parameters.ingenieria){
        for(var i = 0; i < 6; i++){
          sCarreras = sCarreras + ".\n" + aCarreras[i];
        }
        speech = "Hay 6 ingenierías, y son \n" + sCarreras;
      } else if(req.body.queryResult.parameters.licenciatura){
        speech = "Hay 2 licenciaturas, y son \nContabilidad y Administración";
      } else if(req.body.queryResult.parameters.bachillerato){
        var sCarrera = req.body.queryResult.parameters.carrera;
        aCarreras.indexOf(sCarrera); 
        speech = "El bachillerato de " + sCarrera + " es " +  aBachilleratos[aCarreras.indexOf(sCarrera)];
      } else if(req.body.queryResult.parameters.carreer){
        for(var i = 0; i < iTotalCarreras; i++){
          sCarreras = sCarreras + ".\n" + aCarreras[i];
        }
        speech = aFrases[ Math.round(Math.random()*(aFrases.length-1)) ] + "\n" + sCarreras;
      }
      
    //COSTO -------------------------------------------------- FUNCIONAL 100%
    } else if (req.body.queryResult.action == "costo") {
      var cCosto = 2900;
      var aCosto = [
        "El semeste de inscripción cuesta $" + cCosto,
        "El precio actual de inscripción semestral es de $" + cCosto,
        "La inscripción tiene un costo de $" + cCosto + ", sin embargo, cada semestre se actualiza el precio.",
        "Actualmente, en el " + dFecha.getFullYear() + " la inscripción tiene un costo de $" + cCosto,
        "Mira, el semeste de inscripción tiene un costo de $" + cCosto + ", a partir de ahí, cada semestre siguiente se va reduciendo cada $100"];
      speech = aCosto[ Math.round(Math.random()*(aCosto.length-1)) ];
    //DEPARTAMENTO --------------------------------------------------
    } else if (req.body.queryResult.action == "departamento") {
      var aDeptos = [
        "Dirección",
        "Servicios Escolares",
        "Recursos Financieros",
        "Extraescolares",
        "Comunicación y difusión",
        "Gestión Tecnológica y Vinculación",
        "Titulación",
        "Ciencias Básicas",
        "Recursos Materiales",
        "División de Estudios",
        "Centro de cómputo"
      ];
      var aFuncion = [
        "Dirigir y gestionar de manera general el plantel.",
        "Planear, coordinar, controlar y evaluar las actividades relacionadas con la prestación de los servicios escolares a los alumnos del Instituto Tecnológico, conforme a las normas y lineamientos por la Secretaria de Educación Pública.",
        "Planear, coordinar, controlar y evaluar las actividades relacionadas con la administración de los recursos financieros del Instituto Tecnológico conforme a las normas y lineamientos establecidos por la Secretaría de Educación Pública.",
        "Gestionar todas aquellas actividades tales como basquetbol, futbol, danza, ajedrez, entre otras; y suelen desarrollarse al mediodía o por la tarde, una vez finalizada las clases",
        "Comunicar eventos, activiades o acontecimientos relacionados con el plantel, a través de los medios de comunicación de la ciudad.",
        "Planear, coordinar, controlar y evaluar las actividades relacionadas con el servicio social, las residencias profesionales, la bolsa de trabajo e inglés.",
        "Planear, coordinar, controlar y evaluar las actividades relacionadas con el proceso de titulación de los estudiantes en sus respectivas opciones.",
        "Desarrollar competencias en el plantel relacionadas con las ciencias tales como matemáticas, física o química.",
        "Administrar y gestionar las herramientas y materiales del plantel necesarios para realizar actividades afines.",
        "Gestionar aspectos académicos de los estudiantes tales como las altas, bajas, exámenes especiales, plan de estudios, etcétera.",
        "Propiciar que las tecnologías lleguen a todos los usuarios, siendo instrumento para sus investigaciones, ejercicio docente o en su defecto herramientas fundamentales para el desarrollo educativo."
      ];
      if(req.body.queryResult.parameters.definicion){
        speech = "Un departamento generalmente se entiende como una parte singular de la institución; es como un segmento del plantel.";
      } else if (req.body.queryResult.parameters.cuales) {        
        speech = "Los departamentos del itlac son ";
        for(var i = 0; i < aDeptos.length; i++){
          speech = speech + ".\n" + aDeptos[i];
        }
      } else if (req.body.queryResult.parameters.funcion) {
        var sDepto = req.body.queryResult.parameters.depto;
        aDeptos.indexOf(sDepto); 
        speech = "La función del departamento de " + sDepto + " es " +  aFuncion[aDeptos.indexOf(sDepto)];
      }      
    //GENERALIDADES --------------------------------------------------
    } else if (req.body.queryResult.action == "general") {
      if(req.body.queryResult.parameters.concepto){
        speech = "El Instituto Tecnológico de Lázaro Cárdenas es la máxima casa de estudios de la ciudad. Contamos con 6 ingenierías y 2 licenciaturas. Para más informes puedes llamar al 753 537 1977 o puedes seguir hablando conmigo.";
      } else if (req.body.queryResult.parameters.mision) {        
        speech = "Formar profesionales con un alto sentido nacionalista de compromiso social, de servicio a su comunidad, identificados con el desarrollo de su región y del país, a través de una educación pública de calidad, pertinente que les proporcione los conocimientos, actitudes, habilidades y destrezas que cubran los parámetros de competencia internacional, a fin de satisfacer la demanda que el desarrollo de la región y del país requieren.";        
      } else if (req.body.queryResult.parameters.vision) {
        speech = "Ser una institución pública de educación superior y de postgrado con carácter nacionalista, con respecto a nuestros principios y valores. Con un modelo educativo, centrado en el aprendizaje, congruente y dinámico de acuerdo a las necesidades del entorno, que impulse el desarrollo económico, tecnológico y la investigación científica.";        
      }
    //ERROR --------------------------------------------------
    }else {
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
