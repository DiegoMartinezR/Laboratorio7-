var express = require('express');
var router = express.Router();

const ObjNivel = {
    nivel: null
}

const ObjCurso = {
    curso: null,
    pago: null,
    nive: null
}

const cursos = ['Java', 'Php', '.Net'];
const pagos = [1200, 800, 1500];



router.get('/', function (req, res, next) {
    const datos = {
        "titulo": "cursos de programacion",
        "left": false,
        "right": true
    }
    res.render('dashboard', datos, (err, html) => {
        res.render('layout', {
            "seccion": html,
        });
    });
});

router.post('/nivel', function (req, res, next) {
    const datos = {
        "titulo": "Nivel de que desea llevar",
        "left": true,
        "right": true
    }
    ObjCurso.curso = req.body.curso;
    
    res.render('nivel', datos, (err, html) => {
        res.render('layout', {
            "seccion": html,
        });
    });
});


router.post('/pago', function (req, res, next) {
    const datos = {
        "titulo": "Tipo de Pago",
        "left": true,
        "right": false
    }

    var nivel = req.body.nivel1 + req.body.nivel2 + req.body.nivel3;

    var nivelfinal = nivel.replace("undefined","");

    
    console.log(nivelfinal);

    if (nivelfinal == "1") {
        nivelob = "Basico"
    }else if(nivelfinal == "2"){
        nivelob = "Intermedio"
    }else if(nivelfinal == "3"){
        nivelob = "Avanzado"
    }else if(nivelfinal == "12"){
        nivelob = "Basico - Intermedio"
    }else if(nivelfinal == "23"){
        nivelob = "Intermedio - Avanzado"
    }else if(nivelfinal == "13"){
        nivelob = "Basico - Avanzado"
    }else{
        nivelob = "Basico - Intermedio - Avanzado"
    }

     ObjCurso.nivel = nivelob;
     ObjNivel.nivel = nivelfinal;

    console.log(ObjCurso.nivel);

    res.render('pagos', datos, (err, html) => {
        res.render('layout', {
            "seccion": html,
        });
    });
});

router.post('/resultado', function (req, res, next) {
     

    ObjCurso.pago = req.body.tipoPago;
    var niv = ObjNivel.nivel;

    
    var txtpago = ObjCurso.pago;
    var cantidadPago = pagos[ObjCurso.curso];

    if (txtpago == 'efectivo') {
        if (niv == "1") {
             cantidadPago = cantidadPago - (cantidadPago * 0.1)
          }else if(niv == "2"){
             cantidadPago = cantidadPago - (cantidadPago * 0.1)
         }else if(niv == "3"){
             cantidadPago = cantidadPago - (cantidadPago * 0.1)
          }else if(niv == "12"){
             cantidadPago = (cantidadPago - (cantidadPago * 0.1))*2
          }else if(niv == "23"){
             cantidadPago = (cantidadPago - (cantidadPago * 0.1))*2
           }else if(niv == "13"){
             cantidadPago = (cantidadPago - (cantidadPago * 0.1))*2
          }else{
             cantidadPago = (cantidadPago - (cantidadPago * 0.1))*3
          }

    }else{

        if (niv == "1") {
             cantidadPago = cantidadPago
          }else if(niv == "2"){
             cantidadPago = cantidadPago
         }else if(niv == "3"){
             cantidadPago = cantidadPago
          }else if(niv == "12"){
             cantidadPago = (cantidadPago)*2
          }else if(niv == "23"){
             cantidadPago = (cantidadPago)*2
           }else if(niv == "13"){
             cantidadPago = (cantidadPago)*2
          }else{
             cantidadPago = (cantidadPago)*3
          }

    }


    // if (nivelfinal == "1") {
    //     nivelob = "Basico"
    // }else if(nivelfinal == "2"){
    //     nivelob = "Intermedio"
    // }else if(nivelfinal == "3"){
    //     nivelob = "Avanzado"
    // }else if(nivelfinal == "12"){
    //     nivelob = "Basico - Intermedio"
    // }else if(nivelfinal == "23"){
    //     nivelob = "Intermedio - Avanzado"
    // }else if(nivelfinal == "13"){
    //     nivelob = "Basico - Avanzado"
    // }else{
    //     nivelob = "Basico - Intermedio - Avanzado"
    // }


    ObjCurso.curso = cursos[ObjCurso.curso];
    const datos = {
        "titulo": "Tipo de Pago",
        "left": false,
        "right": false,
        "detalle": ObjCurso,
        "pago": cantidadPago
        
    }
    res.render('resultado', datos, (err, html) => {
        res.render('layout', {
            "seccion": html,
        });
    });
});

module.exports = router;
