/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"greeting/_ViewBase",
	"dojo/text!./templates/greetingWidget.html",
	"dojo/on",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dijit/registry",
	"dijit/form/TextBox"
], function (declare, lang,  _ViewBase, template, on, dom, domStyle, domAttr, registry) {

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
		constructor: function() {
			this.inherited(arguments);
		},

		postCreate: function(){
			on(this.btnEdit, "click", lang.hitch(this, 'processEdit'));
			on(this.btnCancel, "click", lang.hitch(this, 'processCancel'));
			on(this.btnDelete, "click", lang.hitch(this, 'processDelete'));
			on(this.btnSave, "click", lang.hitch(this, 'processUpdate'));
		},

		processEdit: function(){
			if(dom.byId('isUserAdmin').value != 'True'){
				alert("You can not  update");
				return;
			}
			//domAttr.set(this.contentEditNode, "readonly" , false);
			domStyle.set(this.btnEdit, "display", "none");
			domStyle.set(this.btnSave, "display", "inline-block");
			domStyle.set(this.btnCancel, "display", "inline-block");
		},


		processCancel: function(){
			//domStyle.set(this.contentEditNode, "display", "none");
			domStyle.set(this.btnEdit, "display", "inline-block");
			domStyle.set(this.btnSave, "display", "none");
			domStyle.set(this.btnCancel, "display", "none");
		},

		processDelete: function(){
			if(dom.byId('isUserAdmin').value != 'True'){
				alert("You can not delete");
				return;
			}
			var isDelete = confirm("Do you want to delete this greeting?");
			if (isDelete == true) {
				this._GuestBookViewObj.processDeleteGreeting(this.id_greeting, this.guestBookName);
			}
		},

		processUpdate: function(){
			this._GuestBookViewObj.processUpdateGreeting(this.id_greeting, this.guestBookName, this.contentEditNode.get('value'));
			domStyle.set(this.btnEdit, "display", "inline-block");
			domStyle.set(this.btnSave, "display", "none");
			domStyle.set(this.btnCancel, "display", "none");
			alert("Update Greeting successful");
		}
	});
});