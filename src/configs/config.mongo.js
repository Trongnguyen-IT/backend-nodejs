const dev = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        connectionString: process.env.DEV_APP_CONNECTIONSTRING
    }
}

const prod = {
    app: {
        port: process.env.PRO_APP_PORT
    },
    db: {
        connectionString: process.env.PROD_APP_CONNECTIONSTRING 
    }
}

const env = process.env.NODE_ENV || 'dev'

const config = { dev, prod }

module.exports = config[env]