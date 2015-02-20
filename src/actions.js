var Reflux = require('reflux');
/* or
    var Actions = Reflux.createActions([
        "statusUpdate"
    ]);
    Actions.statusUpdate();
*/

module.exports = Reflux.createActions([
	"statusUpdate",
	"login",
	"logout",
	"new-post",
	"edit-post",
	"delete-post"
]);
