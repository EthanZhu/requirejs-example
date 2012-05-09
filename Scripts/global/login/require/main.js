// JavaScript Document
define(['require','console.plugin','jquery','./startpage'], function(require) {
    //jquery have been loaded.
    var startpage = require('./startpage');
    var $ = require('jquery');
    //var $ = jQuery;
    require(['console.plugin'],function(){
    	$(function() {
			startpage.init();
			console.log('cache size');
			console.log($.cache);
	    });
    })

});