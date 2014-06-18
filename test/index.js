/*
 * Test Cases for the Troll Library
 */

describe('Troll', function() {

    var troll = require('../');
    troll.addStrategies([
       troll.PREMADESTRATEGIES.PASSPORT
    ]);

    var req = {
       user: {

       },
       session: {

       }
    };

    var res = {
       redirect:function() {
           throw "redirected";
       }
    };

    describe('#shallNotPass', function() {
       it('should throw an error for no user', function(done) {
           try {
               troll.shallNotPass('view')(req,res,done);
           } catch(e) {
               if (e == "redirected") {
                   done();
                   return;
                }
                throw e;
           }
           throw "Did not throw error";
       });
    });

    describe('#userHasPermission', function() {
       it('should return an error message', function(done) {
            var e = troll.userHasPermission(req, 'view', function(error, isAbleToLogin) {
                if (isAbleToLogin) {
                    throw 'User was able to login';
                }
                done();
            });
       });
    })


});
