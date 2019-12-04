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
  var aPreguntas = [
    "Ahm... ¿Necesitas algo más?", "¿En qué más puedo ayudarte?", "¿Necesitas ayuda con otra cosa?",
    "¿Algo más, humano?", "¿Otra cosita? Dime con confianza.",
  ];
  //*******************************************************************************************************/    
  if (req.body.queryResult.action == "saludo") {                    //SALUDO ------------- FUNCIONAL 100%
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
      "¿Te puedo ayudar en algo", "¿Para qué soy bueno?", "¿Qué se le ofrece?"];      
    speech = sSaludo + ", " + aSaludoTres[ Math.round(Math.random()*(aSaludoTres.length-1))];
  
  } else if (req.body.queryResult.action == "carrera") {            //CARRERA ------------ FUNCIONAL 100%
    var aCarreras = [
      "ingeniería en sistemas computacionales", "ingeniería química", "ingeniería electrónica", "ingeniería electromecánica",
      "ingeniería industrial", "ingeniería en gestión empresarial", "contabilidad", "administración."
    ];
    var aBachilleratos = [
      "Físico-Matemático", "Químico-Biólogo", "Físico-Matemático", "Físico-Matemático", "Físico-Matemático, Químico-Biólogo o Económico-Administrativo",
      "Económico-Administrativo", "Económico-Administrativo", "Económico-Administrativo"
    ];
    var aFrases = [
      "En el Instituto Tecnológico de Lázaro Cárdenas, hay 6 Ingenierías y 2 Licenciaturas, y son",
      "Las carreras que hay en el ITLAC son ", "Mira, existen 6 Ingenierías y 2 Licenciaturas, y son "
    ];
    var sCarreras = "";
    var iTotalCarreras = aCarreras.length;    
    if(req.body.queryResult.parameters.inge){
      for(var i = 0; i < 6; i++)
        sCarreras = sCarreras + aCarreras[i] + ".\n";
      speech = "Hay 6 ingenierías, y son \n" + sCarreras;
    } else if(req.body.queryResult.parameters.licenciatura){
      speech = "Hay 2 licenciaturas, y son \nContabilidad y Administración";
    } else if(req.body.queryResult.parameters.bachillerato){
      var sCarrera2 = req.body.queryResult.parameters.carrera;
      var sCarrera = sCarrera2
      aCarreras.indexOf(sCarrera); 
      speech = "El bachillerato de " + sCarrera + " es " +  aBachilleratos[aCarreras.indexOf(sCarrera)];
    } else if(req.body.queryResult.parameters.carreer){
      for(var i = 0; i < iTotalCarreras; i++)
        sCarreras = (i == 0) ? "\n" + aCarreras[i].charAt(0).toUpperCase() + aCarreras[i].slice(1) : sCarreras + ".\n" + aCarreras[i].charAt(0).toUpperCase() + aCarreras[i].slice(1);      
      speech = aFrases[ Math.round(Math.random()*(aFrases.length-1)) ] + "\n" + sCarreras;
    }
    speech += "\n" + aPreguntas[ Math.round(Math.random()*(aPreguntas.length-1)) ];
    
  } else if (req.body.queryResult.action == "costo") {              //COSTO -------------- FUNCIONAL 100%
    var cCosto = 2900;
    var aCosto = [
      "El semeste de inscripción cuesta $" + cCosto,
      "El precio actual de inscripción semestral es de $" + cCosto,
      "La inscripción tiene un costo de $" + cCosto + ", sin embargo, cada semestre se actualiza el precio.",
      "Actualmente, en el " + dFecha.getFullYear() + " la inscripción tiene un costo de $" + cCosto,
      "Mira, el semeste de inscripción tiene un costo de $" + cCosto + ", a partir de ahí, cada semestre siguiente se va reduciendo cada $100"];
    speech = aCosto[ Math.round(Math.random()*(aCosto.length-1)) ]; 
    speech += "\n" + aPreguntas[ Math.round(Math.random()*(aPreguntas.length-1)) ];   
  } else if (req.body.queryResult.action == "departamento") {       //DEPARTAMENTO ------- FUNCIONAL 100%
    var aDeptos = [
      "dirección", "servicios escolares", "recursos financieros", "extraescolares", "comunicación y difusión", "gestión tecnológica y vinculación", 
      "titulación", "ciencias básicas", "recursos materiales", "división de estudios", "centro de cómputo"
    ];
    var aFuncion = [
      "dirigir y gestionar de manera general el plantel.",
      "planear, coordinar, controlar y evaluar las actividades relacionadas con la prestación de los servicios escolares a los alumnos del Instituto Tecnológico, conforme a las normas y lineamientos por la Secretaria de Educación Pública.",
      "planear, coordinar, controlar y evaluar las actividades relacionadas con la administración de los recursos financieros del Instituto Tecnológico conforme a las normas y lineamientos establecidos por la Secretaría de Educación Pública.",
      "gestionar todas aquellas actividades tales como basquetbol, futbol, danza, ajedrez, entre otras; y suelen desarrollarse al mediodía o por la tarde, una vez finalizada las clases",
      "comunicar eventos, activiades o acontecimientos relacionados con el plantel, a través de los medios de comunicación de la ciudad.",
      "planear, coordinar, controlar y evaluar las actividades relacionadas con el servicio social, las residencias profesionales, la bolsa de trabajo e inglés.",
      "planear, coordinar, controlar y evaluar las actividades relacionadas con el proceso de titulación de los estudiantes en sus respectivas opciones.",
      "desarrollar competencias en el plantel relacionadas con las ciencias tales como matemáticas, física o química.",
      "aministrar y gestionar las herramientas y materiales del plantel necesarios para realizar actividades afines.",
      "gestionar aspectos académicos de los estudiantes tales como las altas, bajas, exámenes especiales, plan de estudios, etcétera.",
      "propiciar que las tecnologías lleguen a todos los usuarios, siendo instrumento para sus investigaciones, ejercicio docente o en su defecto herramientas fundamentales para el desarrollo educativo."
    ];
    if(req.body.queryResult.parameters.definicion){
      speech = "Un departamento generalmente se entiende como una parte singular de la institución; es como un segmento del plantel.";
    } else if (req.body.queryResult.parameters.cuales) {        
      speech = "Los departamentos del itlac son ";
      for(var i = 0; i < aDeptos.length; i++){
        speech = speech + ".\n" + aDeptos[i].charAt(0).toUpperCase() + aDeptos[i].slice(1);
      }
    } else if (req.body.queryResult.parameters.funcion) {
      var sDepto = req.body.queryResult.parameters.depto;
      aDeptos.indexOf(sDepto); 
      speech = "La función del departamento de " + sDepto + " es " +  aFuncion[aDeptos.indexOf(sDepto)];
    }
    speech += "\n" + aPreguntas[ Math.round(Math.random()*(aPreguntas.length-1)) ];
  } else if (req.body.queryResult.action == "general") {            //GENERALIDADES ------ FUNCIONAL 100%
    if(req.body.queryResult.parameters.concepto){
      speech = "El Instituto Tecnológico de Lázaro Cárdenas es la máxima casa de estudios de la ciudad. Contamos con 6 ingenierías y 2 licenciaturas. Para más informes puedes llamar al 753 537 1977 o puedes seguir hablando conmigo.";
    } else if (req.body.queryResult.parameters.mision) {        
      speech = "La misión del itlac es formar profesionales con un alto sentido nacionalista de compromiso social, de servicio a su comunidad, identificados con el desarrollo de su región y del país, a través de una educación pública de calidad, pertinente que les proporcione los conocimientos, actitudes, habilidades y destrezas que cubran los parámetros de competencia internacional, a fin de satisfacer la demanda que el desarrollo de la región y del país requieren.";        
    } else if (req.body.queryResult.parameters.vision) {
      speech = "La vision del itlac es ser una institución pública de educación superior y de postgrado con carácter nacionalista, con respecto a nuestros principios y valores. Con un modelo educativo, centrado en el aprendizaje, congruente y dinámico de acuerdo a las necesidades del entorno, que impulse el desarrollo económico, tecnológico y la investigación científica.";        
    } else if (req.body.queryResult.parameters.liberacion) {
      speech = "Profe Tello, ya libérelos, ándele. Ya estoy hablando y bien, así la neta yo creo que ya pasaron, me programaron chido. Ándele, y sirve que nos vamos temprano hoy.";        
    }
    speech += "\n" + aPreguntas[ Math.round(Math.random()*(aPreguntas.length-1)) ];
  } else if (req.body.queryResult.action == "agradecimiento") {            //AGRADECIMIENTO ------ FUNCIONAL 100%
    var aAgradecimiento = [
      "De nada, es un gusto poder ayudar.",
      "No es nada, amo ayudar a las personas.",
      "¡No te preocupes! al hablar conmigo, tu me ayudas a aprender.",
      "De nada, espero que te haya servido de algo.",
      "No es nada, al contrario, gracias a tí.",
      "De nada, espero que la información haya sido útil.",
    ];
    speech = aAgradecimiento[ Math.round(Math.random()*(aAgradecimiento.length-1)) ];
    speech += "\n" + aPreguntas[ Math.round(Math.random()*(aPreguntas.length-1)) ];
  } else if (req.body.queryResult.action == "despedida") {            //DESPEDIDA ------ FUNCIONAL 100%
    var aDespedida1 = [
      "Adiós", "¡Nos vemos!", "Hasta pronto", "Nos vemos luego", "¡Hasta luego!"
    ];
    var aDespedida2 = [
      "espero haber sido de ayuda. ¡Que tengas un lindo día!.",
      "espero que te haya servido de algo.",
      "cuando lo necesites, aquí estaré. ¡Que te diviertas!",
      "espero que la información haya sido útil.",
    ];
    speech = aDespedida1[ Math.round(Math.random()*(aDespedida1.length-1)) ];
    speech += ", " + aDespedida2[ Math.round(Math.random()*(aDespedida2.length-1)) ];
  } else {                                                          //ERROR -------------- FUNCIONAL 100%
    speech = "Ocurrió un problema. Hable de nuevo, por favor.";
  }
  //*******************************************************************************************************/

  //Variable que almacena el texto a reproducir en sonido (obviamente es el mismo que el escrito)
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
  //Retorno de parámetros, texto escrito y texto para reproducción.
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

//Funcion GET en Raiz para mostrar la página principal del servidor.
app.get('/', (req, res) => {
  var html = 
  "<html>"+
    "<h1>🌏 ITLACbot's Server is working</h1>"+
    "<h3>ITLACbot by Alcantara & Cuevas. Copyright © 2019, ITLACbot. Todos los derechos reservados.</h3>"+
    "<iframe"+
      "allow='microphone;'"+
      "width='350'"+
      "height='430'"+
      "src='https://console.dialogflow.com/api-client/demo/embedded/d2e84fbb-77ac-4bf6-a7e6-2471a953eee8'>"+
    "</iframe>"+
  "</html>";
  
	res.status(200).send(html);
});

//Oyente en el puesto 8000 del servidor para peticiones POST del Webhook
app.listen(process.env.PORT || 8000, function() {
  console.log("🌏 app is running up and listening");
});