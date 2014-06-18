/**
 * Checks if a user has a certain permission property
 */

var _ = require('underscore');

module.exports = function(req, permission) {
    if ('' === permission) {
        return true;
    }

    if (!(req.user && typeof req.user[permission] === 'undefined')) {
        throw 'User does not have permission to access this feature';
    }

    return true;
}
