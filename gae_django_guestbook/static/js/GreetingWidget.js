/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"greeting/_ViewBase",
	"dojo/text!./templates/greetingWidget.html"
], function (declare, _ViewBase, template) {

	return declare([_ViewBase], {
		templateString: template,
		createdTime: '',
		updatedTime: '',
		createdUser: '',
		updatedUser: '',

		constructor: function() {
			this.inherited(arguments);
		}
	});
});