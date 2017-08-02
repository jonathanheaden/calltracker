var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new LocalStrategy({
        usernameField: 'loginname'
    },
    function (username, password, done) {
        console.log('find user');
        User.findOne({
            loginname: username
        }, function (err, user) {
            console.log('checking');
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        })
    }));
               
               


