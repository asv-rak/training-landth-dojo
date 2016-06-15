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

		greetingClass: 'greeting',
		guestBookClass: 'guestbook',
		contentLabel: 'dataInput',

		greetingContent: '',
		guestBookName: '',

		postCreate: function () {
			this.initGuestBook();
		},

		initGuestBook: function () {
			var guestBookList = [
				{
					guestBookName: '1', greetingList: [
						{content: 'guestbook 01 - greeting 01'},
						{content: 'guestbook 01 - greeting 02'}
					]
				},
				{
					guestBookName: '2', greetingList: [
					{content: 'guestbook 02 - greeting 01'}
				]
				},
				{guestBookName: '3', greetingList: []},
				{
					guestBookName: '4', greetingList: [
					{content: 'guestbook 04 - greeting 01'}
				]
				},
				{
					guestBookName: '5', greetingList: [
					{content: 'guestbook 05 - greeting 01'},
					{content: 'guestbook 05 - greeting 02'},
					{content: 'guestbook 05 - greeting 03'}
				]
				}
			];

			for (var i = 0; i < guestBookList.length; i++) {
				var option = this.guestBookNameListNode.appendChild(domConstruct.toDom('<option>' + guestBookList[i].guestBookName + '</option>'));
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