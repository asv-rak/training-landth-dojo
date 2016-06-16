/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"greeting/_ViewBase",
	"dojo/text!./templates/GuestBookView.html",
	"dojo/dom-construct",
	"dojo/dom",
	"dojo/on",
	"greeting/GreetingWidget",
	"dojo/request",
	"dojo/cookie",
	"dojo/store/JsonRest",
	"dijit/form/TextBox"
], function (declare, lang, _ViewBase, template, domConstruct, dom, on, _GreetingWidget, request, cookie, JsonRest) {

	return declare('guestbook.GuestBookView', [_ViewBase], {

		templateString: template,

		currentGuestBookName: '',

		greetingClass: 'greeting',
		guestBookClass: 'guestbook',
		contentLabel: 'dataInput',

		greetingContent: '',
		guestBookName: 'default_guestbook',
		store: '',

		postCreate: function () {
			this.initGuestBook();
			on(this.btnSwitch, "click", lang.hitch(this, 'processSearch'));

		},

		initGuestBook: function () {
			for (var i = 1; i <= 10; i++) {
				var option = this.guestBookNameListNode.appendChild(domConstruct.toDom('<option>' + i + '</option>'));
			}

			this.store = new JsonRest({});
			var url = '/api/guestbook/' + this.getGuestBookName(true) + '/greeting/';
			this.loadGreetingList(url);
		},

		getGuestBookName: function (isDefault) {
			var tmpGuestBookName = (isDefault == true) ? 'default_guestbook' : '0';
			return (this.inputGuestBookName.get("value") ? this.inputGuestBookName.get("value") : tmpGuestBookName );
		},

		processEdit: function () {
			domStyle.set(this.btnEdit, "display", "none");
		},

		processSearch: function () {
			var url = '/api/guestbook/' + this.getGuestBookName(false) + '/greeting/';
			this.loadGreetingList(url);
		},

		processDeleteGreeting: function (greetingId, guestBookName) {
			var url = '/api/guestbook/' + guestBookName + '/greeting/';
			this.store.target = url;
			this.store.headers = {"X-CSRFToken": cookie("csrftoken")};
			return this.store.remove(greetingId);
		},

		processUpdateGreeting: function(greetingId, guestBookName, textGreeting){
			var url = '/api/guestbook/' + guestBookName + '/greeting/';
			this.store.target = url;
			this.store.headers = {"X-CSRFToken": cookie("csrftoken")};
			return this.store.put({
				greeting_content: textGreeting
			}, {
				id: greetingId
			});
		},

		loadGreetingList: function (url) {
			this.store.target = url;
			this.store.headers = {"X-CSRFToken": cookie("csrftoken")};
			var _this = this;
			_this.greetingListNode.innerHTML = '';
			this.store.query().then(function (results) {
				_this.greetingTotal.innerHTML = results.greetings.length + ' Items';
				if (results.greetings) {
					for (var i = 0; i < results.greetings.length; i++) {
						var greetingWidget = new _GreetingWidget({
							content: results.greetings[i].content || '',
							createdTime: results.greetings[i].date || '',
							updatedTime: results.greetings[i].updated_date || '',
							createdUser: results.greetings[i].user || '',
							updatedUser: results.greetings[i].updated_by || '',
							guestBookName: _this.getGuestBookName(false),
							id_greeting: results.greetings[i].id_greeting || '',
							_GuestBookViewObj: _this
						});
						domConstruct.place(greetingWidget.domNode, _this.greetingListNode);
					}
				}
			});
		}


	});
});