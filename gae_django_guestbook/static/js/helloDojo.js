/**
 * Created by lando on 6/14/16.
 */
//alert("Hello Dojo");


require([
    'dojo/dom',
    'dojo/query',
    'dojo/fx',
    "dojo/dom-style",
    "dojo/_base/window",
    "dojo/dom-construct",
    'dojo/domReady!',
], function(dom, query, fx, domStyle, win, domConstruct){

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
});