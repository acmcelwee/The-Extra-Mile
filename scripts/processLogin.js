define([], function() {
    
    var accessToken;
    
    function getHashUrlVars(){
        var vars = [], 
            hash,
            hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
            
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        
        return vars;
    }

    // Get all URL parameters
    accessToken = getHashUrlVars()['access_token'];
    localStorage.setItem('access_token', accessToken);
    
    window.location = '/';
});
