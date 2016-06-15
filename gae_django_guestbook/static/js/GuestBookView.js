/**
 * Created by lando on 6/15/16.
 */
define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/guestBookWidget.html",
	"dojo/dom-construct"
], function (declare, _WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin, template, domConstruct) {

	return declare([_WidgetBase, _TemplatedMixin], {

		//
		accessClass: 'access',
		greetingClass: 'greeting',
		gbClass: 'guestbook',
		contentLabel: 'dataInput',

		//
		greetingContent: '',
		guestBookName: '',

		templateString: template,

		postCreate: function () {
			var guestBookList = [
				{guestBookName: '1', greetingList: [
					{content: 'guestbook 01 - greeting 01'},
					{content: 'guestbook 01 - greeting 02'}
				]},
				{guestBookName: '2', greetingList: [
					{content: 'guestbook 02 - greeting 01'}
				]},
				{guestBookName: '3', greetingList: []},
				{guestBookName: '4', greetingList: [
					{content: 'guestbook 04 - greeting 01'}
				]},
				{guestBookName: '5', greetingList: [
					{content: 'guestbook 05 - greeting 01'},
					{content: 'guestbook 05 - greeting 02'},
					{content: 'guestbook 05 - greeting 03'}
				]}
			];
			var selectNode = this.gbNameListNode;
			for (var i = 0; i < guestBookList.length; i++) {
				var option = selectNode.appendChild(domConstruct.toDom('<option>' + guestBookList[i].guestBookName + '</option>'));
			}
		}

	});
});