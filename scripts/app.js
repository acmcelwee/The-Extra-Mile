require.config({
    paths: {
        tmpl: "lib/tmpl"
    },
});

require(['lib/jquery', 'lib/underscore', 'lib/backbone', 'user', 'collections/workouts', 'views/workouts/list', 'tmpl!templates/User', 'tmpl!templates/entries'], function($, _, Backbone, User, Workouts, WorkoutsListView, UserTmpl, EntriesTmpl) {
    $(function() {

        var workouts = new Workouts,
            workoutsListView = new WorkoutsListView({
                collection : workouts
            });
        

        function retrieveEntries(user) {
            if (user && user.username){
                $.getJSON(
                    'http://api.dailymile.com/people/' + user.username + '/entries.json?callback=?',
                    function(response) {
                        handleEntriesResponse(response);
                    }
                );
            }
        }

        function handleEntriesResponse(response) {
            var entries;

            if (response && response.entries) {
                workouts.reset();
                workouts.add(response.entries);
            } else {
                console.log('No entries');
            }
        }

        User.retrieveUserData(function(user) {
            $('.header').html(UserTmpl(user));
            
            retrieveEntries(user);
        });
    });
});
