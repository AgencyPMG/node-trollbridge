/*
 * A class to decide if we should let the user pass
 */

var Troll = function()
{
    this.strategies = [];
    this.redirectUrl = '/login';
}

Troll.prototype.PREMADESTRATEGIES = {
    PASSPORT: require('./bakedstrategies/passport'),
    USERPROPERTY: require('./bakedstrategies/userproperty')
}
/**
 * Sets the redirectUrl if it is unable to login
 * @param redirectUrl {string} the redirectUrl
 */
Troll.prototype.setRedirectUrl = function(redirectUrl) {
    this.redirectUrl = redirectUrl;
}

/**
 * Adds strategies to the troll repository to run through
 * @param strategies {array} Array of functions to run through
 */
Troll.prototype.addStrategies = function(strategies) {
    if (!(strategies instaneof Array)) {
        strategies = [strategies];
    }
    this.strategies = this.strategies.concat(strategies);
}

/**
 * Function to use if troll shows an error
 */
Troll.prototype.shallNotPass = function(permission)
{
    var that = this;

    return function(req, res, next)
    {
        that.userHasPermission(req, permission, function(error, hasPermission) {
            if (hasPermission) {
                next();
                return;
            }
            req.session.error = error;
            res.redirect(that.redirectUrl);
        });
    }
}

Troll.prototype.userHasPermission = function(req, permission, cb)
{
    try {
        for (var index in this.strategies) {
            this.strategies[index](req, permission);
        }
    } catch(e) {
        if (cb) {
            cb(e, false);
        }
        return false;
    }

    if (cb) {
        cb(null, true);
    }

    return true;
}

/**
 * Can be used with a templating language
 */
Troll.prototype.layoutHasPermission = function(req) {
    var that = this;
    return function(permission) {
        return that.userHasPermission(req, permission);
    }
}

module.exports = new Troll();
