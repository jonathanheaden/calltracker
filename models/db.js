var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/calltracker';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MLAB_URI;
}

mongoose.connect(dbURI,{ useMongoClient: true });

mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function(){
    console.log('Mongoose connection error:' + err);
});

mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnectd through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

require('./contacts');
require('./users');
