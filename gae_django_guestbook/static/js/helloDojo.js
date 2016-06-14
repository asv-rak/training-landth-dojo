/**
 * Created by lando on 6/14/16.
 */

define([
	'dojo/dom',
	'dojo/dom-construct',
	'dojo/_base/window'
], function (dom, domConstruct, win) {

	var greatingString = null;

	return {
		setText: function (text) {
			greatingString = text;
		},

		getText: function () {
			return greatingString;
		},

		alert: function () {
			alert(greatingString);
		},

		print: function () {
			domConstruct.create(
					'div',
					{
						innerHTML: this.getText(),
						style: {
							color: 'green',
							fontSize: '30px',
							fontWeight: 'bold'
						}
					},
					win.body()
			);
		}
	};
});
