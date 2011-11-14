define(['lib/jquery'], function($) {

    function getAccessToken() {
        return localStorage.getItem('access_token');
    }
    
    function retrieveUserData(callback) {
        var accessToken = getAccessToken();
        if (accessToken) {
            $.getJSON(
                'https://api.dailymile.com/people/me.json?callback=?',
                {
                    'oauth_token' : accessToken
                },
                function(response) {
                    var user = handleUserDataResponse(response);
                    callback && callback(user);
                }
            );
        }
    }
    
    function handleUserDataResponse(response) {
        var user = {};
            
        user.name = response && response.display_name;
        user.username = response && response.username;
        
        return user;
    }
    
    return {
        retrieveUserData : retrieveUserData
    };
});