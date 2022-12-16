var tryRequire = require("try-require");

var config;

if(process.env.HEROKU == "true" || process.env.AWS ){
    var env = process.env; 
    config = {
        cookieSecret: env.COOKIE_SECRET,
        curEnv: env.NODE_ENV,
        aes:{
            secret: env.AES_SECRET,
            pass: env.AES_PASS
        },
        user:{
            secret: env.JWT_SECRET
        },
        dbCreds: env.MONGODB_URI
    };

} else {
    
    var url = __dirname + "/localconfig";
    if(tryRequire.resolve(url)){
        config = require(url);
    }

    // console.log(tryRequire.lastError());
}

export {config};