node-trollbridge
================

A permissions system for Node and Express

##How to use
include the troll library and setup any of the strategies you want to include.

You can make your own strategy functions or use some of the premade ones

```js
var trollbridge = require('trollbridge');
```

```js
trollbridge.addStrategies([
   trollbridge.PREMADESTRATEGIES.PASSPORT,
   require('./myownstrategy')
]);
```
When creating routes, add a middleware for each route you want to secure

```js
app.get('/user/edit', trollbridge.shallNotPass('edit_user'), userEditFunct));
```

You can also include a locals variable for templating languages
```js
app.use(function(req, res, next) {
    res.locals.has_permission = trollbridge.layoutHasPermission(req);
    next();
})
```
and then in your template
```html
{% if has_permission('edit_user') %}
<a href="/user/edit">Edit User</a>
{% endif %}
```
