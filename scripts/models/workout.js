define(['lib/backbone'], function(Backbone) {
    var workout = Backbone.Model.extend({
        initialize : function() {
            if (!this.get('date')) {
                this.set({
                    date : new Date().getTime() 
                });
            }
        },

        defaults: {
            type : 'Running',
            distance : 0,
            units : 'miles'
        }
    });

    // You usually don't return a model instantiated
    return workout;
});