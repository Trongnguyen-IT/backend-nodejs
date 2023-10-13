const app = require('./app')
const config = require('./configs/config.mongo')

const server = app.listen(config.app.port, () => {
    console.log(`connected server with port ${config.app.port}`);
})

// process.on('SIGINT', () => {
//     server.close(() => {
//         console.log('Exit server');
//     })
// })