define(['lib/backbone', 'models/workout'], function(Backbone, Workout){
	var workouts = Backbone.Collection.extend({
		model : Workout,
		url : '/workouts/'
	});
	
	// You don't usually return a collection instantiated
	return workouts;
});