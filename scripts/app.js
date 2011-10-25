require(['lib/jquery', 'lib/backbone', 'lib/handlebars'], function($, Backbone) {
    $(function() {
        var entryTemplateSource = "<div><div>{{id}}</div><span>{{workout.distance.value}}</span><span>{{workout.distance.units}}</span></div>";
        var entryTemplate = Handlebars.compile(entryTemplateSource);

        function retrieveEntries() {
            $.getJSON(
                'http://api.dailymile.com/people/acolemc/entries.json?callback=?',
                {
                    until: Math.round(new Date().getTime() / 1000),
                },
                function(response) {
                    handleEntriesResponse(response);
                }
            );
        }

        function handleEntriesResponse(response) {
            var entries,
                $contentDiv = $('.content');

            if (response && response.entries) {
                entries = response.entries;
                $.each(entries, function(index, entry) {
                    $contentDiv.append(entryTemplate(entry));
                });
            } else {
                console.log('No entries');
            }
        }

        retrieveEntries();
    });
});
