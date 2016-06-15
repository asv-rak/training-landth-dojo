/**
 * Created by lando on 6/15/16.
 */

define([
	"dojo/_base/declare",
	'dojo/dom-class',
	"dijit/_WidgetBase",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/_TemplatedMixin"
], function (declare, domClass, _WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin) {

	return declare([_WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin], {

		buildRendering: function() {
			this.inherited(arguments);
			this._appendClass();
		},

		_appendClass: function() {
			var parts = this.declaredClass.split('.'),
				baseClass = parts[parts.length - 1];
			baseClass = baseClass.substring(0, 1).toLowerCase() + baseClass.substring(1);
			domClass.add(this.domNode, baseClass);
		}
	});
});