/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"greeting/_ViewBase",
	"dojo/text!./templates/guestBookView.html",
	"dojo/dom-construct",
	"dojo/dom",
	"dojo/on",
	"greeting/GreetingWidget",
	"dojo/request",
	"dojo/cookie",
	"dojo/store/JsonRest",
	"dijit/form/TextBox"
], function (declare, lang, _ViewBase, template, domConstruct, dom, on, _GreetingWidget, request, cookie, JsonRest) {

	return declare([_ViewBase], {

		templateString: template,

		currentGuestBookName: '',

		greetingClass: 'Greeting',
		guestBookClass: 'Guestbook',
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
			var url = '/api/guestbook/default_guestbook/greeting/';
			this.loadGreetingList(url);
		},

		processSearch: function(){
			var url = '/api/guestbook/'+ ( (this.inputGuestBookName.get("value")) ? this.inputGuestBookName.get("value") : '0' ) +'/greeting/';
			this.loadGreetingList(url);
		},

		loadGreetingList: function(url){
			this.store.target = url;
			this.store.headers = {"X-CSRFToken": cookie("csrftoken")};
			var greetingArea = this.greetingWidget;
			greetingArea.innerHTML = '';
			var greeting = this.numGreeting;
			this.store.query().then(function (results) {
				greeting.innerHTML = results.greetings.length + ' Items';
				if(results.greetings){
					for(var i = 0; i < results.greetings.length; i++){
						var greetingWidget = new _GreetingWidget({
							content: ((results.greetings[i].content) ? results.greetings[i].content : ''),
							createdTime: ((results.greetings[i].date) ? results.greetings[i].date : ''),
							updatedTime: ((results.greetings[i].date) ? results.greetings[i].date : ''),
							createdUser: ((results.greetings[i].user) ? results.greetings[i].user : ''),
							updatedUser: ((results.greetings[i].user) ? results.greetings[i].user : '')
						});
						domConstruct.place(greetingWidget.domNode, greetingArea);
					}
				}
			});
		}


	});
});