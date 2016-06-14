/**
 * Created by lando on 6/14/16.
 */
//alert("Hello Dojo");

define([
    // The dojo/dom module is required by this module, so it goes
    // in this list of dependencies.
    'dojo/dom'
], function(dom){
    // Once all modules in the dependency list have loaded, this
    // function is called to define the demo/myModule module.
    //
    // The dojo/dom module is passed as the first argument to this
    // function; additional modules in the dependency list would be
    // passed in as subsequent arguments.

    var greatingString = "n/a";

    // This returned object becomes the defined value of this module
    return {
        setText: function(text){
            greatingString = text;
        },
        print: function (id, text) {
            alert(greatingString);
        }
    };
});


/*require([
    'dojo/dom',
    'dojo/query',
    'dojo/fx',
    "dojo/dom-style",
    "dojo/_base/window",
    "dojo/dom-construct",
    'dojo/domReady!',
], function(dom, query, fx, domStyle, win, domConstruct){

    return {
        print: function(){

        }
    };

    var n = domConstruct.create(
        "div",
        { innerHTML: "Hello Dojo!", style: {color: 'green', fontSize: '30px', fontWeight: 'bold'} },
        win.body()
    );

    fx.slideTo({
        node: n,
        top: 100,
        left: 200
    }).play();
});*/
