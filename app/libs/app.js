var Tarea = Backbone.Model.extend({
	defaults: {
		nombre: '',
		id : Math.floor(Math.random()*100)
	},
	url:"/api/tareas",

});

// var Comentario = Backbone.Model.extend({
// 	setUp: function(data) {
// 		this.url = '/tareas/'+data+'/comments/';
// 	}	
// });
// 
// var Comentarios = Backbone.Collection.extend({
// 	model: Comentario,
// 	initialize: function(tarea_id) {
// 		this.url = '/tareas/'+tarea_id+'/comments'
// 	}
// });

var Tareas = Backbone.Collection.extend({
	model: Tarea
});

var VistaTarea = Backbone.View.extend({
	tagName: "li",
	template: _.template($('#tarea-template').html()),
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	events: {
		"click .delete": "borrar",
		// "click .comments": "cargar_comentarios",
	},
	borrar: function() {
		this.model.destroy();
	},
});

var vistaComentarios = Backbone.Model.extend({
	initialize: function() {
		//this.comentarios = new Comentarios();
		//this.comentarios.setUp(this.model);
	}
});



var VistaTareas = Backbone.View.extend({
	el: "#tareas",
	events:{
		"click #boton_tarea": "hola"		
	},
	initialize: function() {
		window.tareas = new Tareas([{"nombre": "Primera tarea"},{"nombre":"Segunda tarea"}]);
		window.tareas.bind("add",this.render);
		window.tareas.bind("remove", this.render);
		this.render();
	},
	render: function() {
		$("ul",this.el).html("");
		_(window.tareas.models).each(function(tarea){
			var vista_de_tarea_unitaria = new VistaTarea({model: tarea});
			$("ul",this.el).append(vista_de_tarea_unitaria.render().el);
		});	
	},
	hola: function() {
		var nombre = prompt("nombre?");
		var tarea = new Tarea({nombre : nombre});
		tarea.save();
		window.tareas.add(tarea);
	},
	borrar: function() {
		
	}
});

var aplicacion = new VistaTareas();

