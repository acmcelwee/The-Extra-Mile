define(['lib/jquery', 'lib/underscore', 'lib/backbone', 'collections/workouts', 'tmpl!templates/entries'], function($, _, Backbone, Workouts, EntriesTemplate){
	var workoutsListView = Backbone.View.extend({
		el: $(".content"),
		
		initialize: function(){
            _.bindAll(this.collection, 'add');
            _.bindAll(this, 'render');
			this.collection.bind('add', this.render);
		},
		
		render : function() {
            console.log('render');
            console.log(this.collection);
            console.log(this.el);
            if (this.collection && this.collection.toJSON) {
                this.el.html(EntriesTemplate({ entries : this.collection.toJSON() }));
            }
		}
	});
    
	return workoutsListView;
});