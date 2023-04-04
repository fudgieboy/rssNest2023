module.exports = {
  apps : [{
    name   : "Chess PM2 App",
    script : "./build/server.js",
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    },
    env_test: {
       NODE_ENV: "test"
    }
  }]
};