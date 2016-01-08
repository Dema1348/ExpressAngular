var express= require('express');
var mongo= require('mongoose');
var app= express();


mongo.connect('mongodb://localhost:27017/angular-rest');
// Configuración
app.configure(function() {  
    // Localización de los ficheros esta¡ticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev')); 
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride());                  
});






var Tarea= mongo.model('Tarea',{
	text: String
})


app.get('/api/tarea',function(req,res) {
	Tarea.find(function(err, data) {
		if(err){
			res.send(err)
		}

		res.json(data)
		
	})
})

app.post('/api/tareas',function(req,res) {
	Tarea.create({ text: req.body.text, done :false },function(err,data) {
		if(err) {
            res.send(err);
        }
        res.json(data);

	})
})

app.delete('/api/tareas/:idTarea',function(req,res) {
	Tarea.remove({ _id: req.params.idTarea}, function(err, data) {
		if(err)
			res.send(err)

		 res.json(data);

	})
})


app.listen(8000,function() {
    console.log("Corriendo el server en el puerto 8000")
})
