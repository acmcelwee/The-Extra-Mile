define('lib/backbone', ['lib/jquery', 'lib/underscore', 'lib/backbone-0.5.3'], function() {
    $.noConflict();
    _.noConflict();
    return Backbone.noConflict();
});
