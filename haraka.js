#!/usr/bin/env node

var path = require('path');
process.env.HARAKA = process.env.HARAKA || path.resolve('.');
require.paths.unshift(path.join(process.env.HARAKA, 'node_modules'));

var fs     = require('fs');
var logger = require('./logger');
var server = require('./server');

exports.version = JSON.parse(
        fs.readFileSync(path.join(__dirname, './package.json'), 'utf8')
    ).version;

process.on('uncaughtException', function (err) {
    if (err.stack) {
        err.stack.split("\n").forEach(logger.logcrit);
    }
    else {
        logger.logcrit('Caught exception: ' + err);
    }
    if (!server.ready) {
        logger.logcrit('Server not ready yet. Stopping.');
        process.exit();
    }
});

logger.log("Starting up Haraka version " + exports.version);


server.createServer();
