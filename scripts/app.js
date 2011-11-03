require.config({
    paths: {
        tmpl: "lib/tmpl"
    },
});

require(['lib/jquery', 'lib/underscore', 'lib/backbone', 'tmpl!templates/foo'], function($, _, Backbone, FooTmpl) {
    $(function() {

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
                    $contentDiv.append(FooTmpl(entry));
                });
            } else {
                console.log('No entries');
            }
        }

        retrieveEntries();
    });
});
