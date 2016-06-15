/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"greeting/_ViewBase",
	"dojo/text!./templates/guestBookWidget.html",
	"dojo/dom-construct",
	"greeting/GreetingWidget"
], function (declare, _ViewBase, template, domConstruct, _GreetingWidget) {

	return declare([_ViewBase], {

		templateString: template,

		currentGuestBookName: '',

		greetingClass: 'Greeting',
		guestBookClass: 'Guestbook',
		contentLabel: 'dataInput',

		greetingContent: '',
		guestBookName: '',

		postCreate: function () {
			this.initGuestBook();
		},

		initGuestBook: function () {

			for (var i = 1; i <= 10; i++) {
				var option = this.guestBookNameListNode.appendChild(domConstruct.toDom('<option>' + i + '</option>'));
			}

			for (var i = 1; i <= 10; i++) {
				var greetingWidget = new _GreetingWidget({
					createdTime: '2015/06/' + i,
					updatedTime: '2016/06/' + i,
					createdUser: 'User Test ' + i,
					updatedUser: 'User Test ' + i
				});
				domConstruct.place(greetingWidget.domNode, this.greetingWidget);
			}

		}
	});
});