/**
 * This can be used when using the passport module, it supports the isAuthenticated method
 */
module.exports = function(req, permission) {
    if (!req.isAuthenticated()) {
        throw "User is not authenticated";
    }

    if (typeof req.user === 'undefined' || req.user == null) {
        throw "Should not be able to login";
    }
}
