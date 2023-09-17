const tryRequire = require("try-require");

let config;

if( ((process.env.HEROKU || process.env.AWS || process.env.VERCEL) == true) || (__dirname.indexOf("build")!= -1) ){
    const env = process.env; 
    config = {
        cookieSecret: env.COOKIE_SECRET,
        curEnv: process.env.ENVIRONMENT || "development",
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
    const url = __dirname + "/localconfig";
    if(tryRequire.resolve(url)){
        config = require(url);
    }

    // console.log(tryRequire.lastError());
}

export {config};