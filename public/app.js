angular.module('TareasApp',[])
	.controller('TareasCtrl', function($http) {
		var vm = this;
		vm.tareas=[];
		vm.cantidad=0;
		$http.get('api/tarea').then(
			function(value) {
				vm.tareas=value.data
				vm.cantidad=vm.tareas.length;
			},
			 function(err) {
			 	console.log(err)
			 })

		vm.crear = function() {
			
			$http.post('api/tareas',{text :vm.text}).then(
				function(value) {
			
					vm.tareas.push(value.data)
					vm.cantidad++;
				},
				function(errr) {})
		};

		vm.eliminar=function  (id,index) {
			$http.delete('api/tareas/'+id).then(
				function(value) {
					vm.cantidad--;
					vm.tareas.splice(index,1)
					console.log(index)
					console.log("eliminado")
				},
				function(err) {
					console.log("errorrr")
				})
		}

		
		
	})


