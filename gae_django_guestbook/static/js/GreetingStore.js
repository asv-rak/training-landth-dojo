/**
 * Created by lando on 6/17/16.
 */
define([
	"dojo/_base/declare",
	"dojo/cookie",
	"dojo/store/JsonRest",
], function (declare, cookie, JsonRest) {
	return declare("guestbook.GreetingStore", null, {
		guestbookName: "default_guestbook",
		store: null,
		
		constructor: function(){
			this.inherited(arguments);
			var url = "/api/guestbook/"+this.guestbookName+"/greeting/";
			this.store = new JsonRest({
				target: url,
				headers: {
					"X-CSRFToken": cookie("csrftoken")
				}
			});
		},

		_addGreeting: function(obj, callback){
			var url = '/api/guestbook/' + obj.guestBookName + '/greeting/';
			this.store.target = url;
			this.store.add({
				guestbook_name: obj.guestBookName,
				content: obj.textGreeting
			}).then(function(data){
				callback(null, data);
			});

		},

		_updateGreeting: function(obj, callback){
			var url = '/api/guestbook/' + obj.guestBookName + '/greeting/';
			this.store.target = url;
			this.store.put({
				greeting_content: obj.textGreeting
			}, {
				id: obj.id_greeting
			}).then(function(data){
				callback(null, data);
			});
		},

		_getListGreeting: function(obj, callback){
			var url = '/api/guestbook/' + obj.guestBookName + '/greeting/';
			this.store.target = url;
			this.store.query().then(function (data) {
				callback(null, data)
			});
		},

		_deleteGreeting: function(obj, callback){
			var url = '/api/guestbook/' + obj.guestBookName + '/greeting/';
			this.store.target = url;
			this.store.remove(obj.id_greeting).then(function(data){
				callback(null, data);
			});
		}


	});
});