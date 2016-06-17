/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom",
	"dojo/on",
	"dojo/store/JsonRest",
	"dijit/form/TextBox",
	"greeting/_ViewBase",
	"greeting/GreetingWidget",
	"greeting/GreetingStore",
	"dojo/text!./templates/GuestBookView.html"
], function (declare, lang, domConstruct, dom, on, JsonRest, TextBox,
			 _ViewBase, _GreetingWidget, GreetingStore, template) {

	return declare('guestbook.GuestBookView', [_ViewBase], {

		templateString: template,

		currentGuestBookName: '',

		greetingClass: 'greeting',
		guestBookClass: 'guestbook',
		contentLabel: 'dataInput',

		greetingContent: '',
		guestBookName: 'default_guestbook',
		GreetingStore: '',

		postCreate: function () {
			this.inherited(arguments);
			this.initGuestBook();
			on(this.btnSwitch, "click", lang.hitch(this, 'processSearch'));
			on(this.btnAdd, "click", lang.hitch(this, 'processAdd'));

		},

		initGuestBook: function () {
			this.GreetingStore = new GreetingStore();
			this.loadGreetingList(null);
		},

		getGuestBookName: function (isDefault) {
			var tmpGuestBookName = isDefault ? 'default_guestbook' : '0';
			return (this.inputGuestBookName.get("value") ?
				this.inputGuestBookName.get("value") : tmpGuestBookName );
		},

		processAdd: function () {
			var _this = this;
			if (_this.signGuestBookName.get('value').length == 0 || _this.inputGreeting.get('value').length == 0) {
				alert("Please Input data");
				return false;
			}
			if (_this.signGuestBookName.get('value').length > 10 || _this.inputGreeting.get('value').length > 10) {
				alert("The text - Maximun is 10");
				return false;
			}

			_this.GreetingStore._addGreeting({
				guestBookName: _this.signGuestBookName.get('value'),
				textGreeting: _this.inputGreeting.get('value')
			}, function (error, data) {
				if(error){
					alert("Add Greeting fail");
				}else{
					alert("Add Greeting successful");
					_this.signGuestBookName.set('value', '');
					_this.inputGreeting.set('value', '');
					_this.loadGreetingList(null);
				}
			});
		},

		processSearch: function () {
			var url = '/api/guestbook/' + this.getGuestBookName(false) + '/greeting/';
			this.loadGreetingList(url);
		},

		loadGreetingList: function (url) {
			if (url == null) {
				url = '/api/guestbook/' + this.getGuestBookName(true) + '/greeting/';
			}
			var _this = this;
			_this.greetingListNode.innerHTML = '';

			this.GreetingStore._getListGreeting({
				guestBookName: _this.getGuestBookName(true)
			}, function (error, results) {
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