'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const _SECOND = 5000

//count connect
const countConnect = function () {
    const numberConnect = mongoose.connections.length
    console.log(`Number of connection is ${numberConnect}`);
}

//check overload
const checkOverload = () => {
    setInterval(() => {
        const numberConnect = mongoose.connections.length
        const numberCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        const maxConnection = numberCores * 5

        console.log('Active connection' + numberConnect);
        console.log('Memory usage::', memoryUsage / 1024 / 1024, 'MB');

        if (numberConnect > maxConnection) {
            console.log('Connection is overload!');
        }
    }, _SECOND)

}
module.exports = { countConnect, checkOverload }