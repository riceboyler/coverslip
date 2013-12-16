/**
 * AuthController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var passport = require('passport');

var AuthController = {

    index: function (req, res) {
        res.view();
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    'google': function (req, res) {
        passport.authenticate('google', { failureRedirect: '/login', scope:['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/plus.circles.read', 'https://www.googleapis.com/auth/plus.profiles.read'], accessType: 'offline' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.view('500');
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },

    'google/callback': function (req, res) {
        passport.authenticate('google',
            function (req, res) {
                res.redirect('/');
            })(req, res);
    }

};
module.exports = AuthController;