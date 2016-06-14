/**
 * Created by lando on 6/14/16.
 */

define([
    'dojo/dom'
], function(dom){

    var greatingString = "n/a";

    return {
        setText: function(text){
            greatingString = text;
        },
        getText: function(){
            return greatingString;
        },
        print: function (id, text) {
            alert(greatingString);
        }
    };
});
