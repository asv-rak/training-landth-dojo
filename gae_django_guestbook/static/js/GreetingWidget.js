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
	"dojo/topic",
	"dijit/form/TextBox",
	"greeting/_ViewBase",
	"greeting/GreetingStore",
	"dojo/text!./templates/GreetingWidget.html"
], function (declare, lang, on, dom, domStyle, domAttr, topic, TextBox, _ViewBase, GreetingStore, template) {

	return declare('guestbook.GreetingWidget', [_ViewBase], {
		templateString: template,
		createdTime: '',
		updatedTime: '',
		createdUser: '',
		updatedUser: '',
		content: '',
		id_greeting: '',

		guestBookName: '',
		addGuestBookName: '',
		addGreetingContent: '',

		constructor: function (obj, guestBookName) {
			this.inherited(arguments);
			if (obj) {
				this.content = obj.content || '';
				this.createdTime = obj.date || '';
				this.updatedTime = obj.updated_date || '';
				this.createdUser = obj.user || '';
				this.updatedUser = obj.updated_by || '';
				this.id_greeting = obj.id_greeting || '';
			}

			if (guestBookName) {
				this.guestBookName = guestBookName;
			}
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
			this.displayEditForm(true);
		},

		processCancel: function () {
			this.contentEditNode.set('value', this.content);
			this.displayEditForm(false);
		},

		displayEditForm: function (display) {
			this.contentEditNode.set('readonly', !display);
			domStyle.set(this.btnEdit, "display", display ? "none" : "inline-block");
			domStyle.set(this.btnSave, "display", display ? "inline-block" : "none");
			domStyle.set(this.btnCancel, "display", display ? "inline-block" : "none");
		},

		processCreate: function (obj, callback) {
			if (obj.guestBookName.length == 0 || obj.textGreeting.length == 0) {
				alert("Please Input data");
				return false;
			}
			if (obj.guestBookName.length > 10 || obj.textGreeting.length > 10) {
				alert("The text - Maximun is 10");
				return false;
			}

			var _greetingStore = new GreetingStore();
			var _this = this;

			_greetingStore._addGreeting({
				guestBookName: obj.guestBookName,
				textGreeting: obj.textGreeting
			}, function (error, data) {
				if (error) {
					alert("Add Greeting fail");
					callback(true, null);
				} else {
					alert("Add Greeting successful");
					callback(null, data);
				}
			});
		},

		processDelete: function () {
			var _greetingStore = new GreetingStore();
			var _this = this;
			if (dom.byId('isUserAdmin').value != 'True') {
				alert("You can not delete");
				return;
			}
			var isDelete = confirm("Do you want to delete this greeting?");
			if (isDelete == true) {
				_greetingStore._deleteGreeting({
					guestBookName: _this.guestBookName,
					id_greeting: _this.id_greeting
				}, function (error, results) {
					if (error) {
						alert("Delete Greeting fail");
					} else {
						topic.publish("guestbook/topic", "loadList");
					}
				});
			}
		},

		processUpdate: function () {
			var _greetingStore = new GreetingStore();
			var _this = this;
			if (_this.contentEditNode.get('value').length > 0 && _this.contentEditNode.get('value').length <= 10) {
				_greetingStore._updateGreeting({
					guestBookName: _this.guestBookName,
					id_greeting: _this.id_greeting,
					textGreeting: _this.contentEditNode.get('value')
				}, function (error, results) {
					_this.contentEditNode.set('readonly', true);
					domStyle.set(_this.btnEdit, "display", "inline-block");
					domStyle.set(_this.btnSave, "display", "none");
					domStyle.set(_this.btnCancel, "display", "none");
					alert(error ? "Update Greeting fail" : "Update Greeting successful");
				});
			} else {
				alert("String length - Maximun 10 - Minimun 1");
			}
		}
	});
});