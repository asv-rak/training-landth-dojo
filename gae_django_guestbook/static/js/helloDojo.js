/**
 * Created by lando on 6/14/16.
 */

define([
	'dojo/dom',
	'dojo/dom-construct',
	'dojo/_base/window'
], function (dom, domConstruct, win) {

	var greetingString = null;

	return {
		setText: function (text) {
			greetingString = text;
		},

		getText: function () {
			return greetingString;
		},

		alert: function () {
			alert(greetingString);
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
