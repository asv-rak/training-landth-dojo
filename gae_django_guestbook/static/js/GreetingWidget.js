/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dijit/registry",
	"dijit/form/TextBox",
	"greeting/_ViewBase",
	"dojo/text!./templates/GreetingWidget.html",
], function (declare, lang, on, dom, domStyle, domAttr, registry, TextBox, _ViewBase, template) {

	return declare('guestbook.GreetingWidget', [_ViewBase], {
		templateString: template,
		createdTime: '',
		updatedTime: '',
		createdUser: '',
		updatedUser: '',
		content: '',
		id_greeting: '',

		guestBookName: '',
		_GuestBookViewObj: null,

		addGuestBookName: '',
		addGreetingContent: '',

		constructor: function () {
			this.inherited(arguments);
		},

		postCreate: function () {
			on(this.btnEdit, "click", lang.hitch(this, 'processEdit'));
			on(this.btnCancel, "click", lang.hitch(this, 'processCancel'));
			on(this.btnDelete, "click", lang.hitch(this, 'processDelete'));
			on(this.btnSave, "click", lang.hitch(this, 'processUpdate'));
		},

		processEdit: function () {
			if (dom.byId('isUserAdmin').value != 'True') {
				alert("You can not  update");
				return;
			}
			this.contentEditNode.set('readonly', false);
			domStyle.set(this.btnEdit, "display", "none");
			domStyle.set(this.btnSave, "display", "inline-block");
			domStyle.set(this.btnCancel, "display", "inline-block");
		},

		processCancel: function () {
			this.contentEditNode.set('readonly', true);
			domStyle.set(this.btnEdit, "display", "inline-block");
			domStyle.set(this.btnSave, "display", "none");
			domStyle.set(this.btnCancel, "display", "none");
		},

		processDelete: function () {
			var _this = this;
			if (dom.byId('isUserAdmin').value != 'True') {
				alert("You can not delete");
				return;
			}
			var isDelete = confirm("Do you want to delete this greeting?");
			if (isDelete == true) {
				_this._GuestBookViewObj.GreetingStore._deleteGreeting({
					guestBookName: _this.guestBookName,
					id_greeting: _this.id_greeting
				}, function (error, results) {
					_this._GuestBookViewObj.loadGreetingList(null);
				});
			}
		},

		processUpdate: function () {
			var _this = this;
			if (_this.contentEditNode.get('value').length > 0 && _this.contentEditNode.get('value').length <= 10) {
				_this._GuestBookViewObj.GreetingStore._updateGreeting({
					guestBookName: _this.guestBookName,
					id_greeting: _this.id_greeting,
					textGreeting: _this.contentEditNode.get('value')
				}, function (error, results) {
					_this.contentEditNode.set('readonly', true);
					domStyle.set(_this.btnEdit, "display", "inline-block");
					domStyle.set(_this.btnSave, "display", "none");
					domStyle.set(_this.btnCancel, "display", "none");
					alert("Update Greeting successful");
				});
			} else {
				alert("String length - Maximun 10 - Minimun 1");
			}
		}
	});
});