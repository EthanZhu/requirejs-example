// JavaScript Document
define(['require','console.plugin','jquery','./startpage'], function(require) {
    //jquery have been loaded.
    var startpage = require('./startpage');
    var $ = require('jquery');
    require(['console.plugin'],function(){
    	$(function() {
			startpage.init();
	    });
    })

});