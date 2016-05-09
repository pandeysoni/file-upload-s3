module.exports = {
    server: {
            host: '0.0.0.0',
            port: 3000
    },
    database: {
        host: 'localhost',
        port: 27017,
        db: 'demo',
        url: 'mongodb://username:password@host:port/databaseName'
    },
    url: {
            basePath: 'http://localhost:9999',
    }
};
