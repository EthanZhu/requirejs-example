define(['require','config','./blockua','./forminit'],function(require,config){
	
	var resizeTimer = config.resizeTimer;
	
	var __action = {
		log : function(info){
			if(config.debug)
				console.log(info);
			
		},
		
		__pageInit : function(){
			$('body').focus();
			var _config = config;
			__action.__pageHeight();
			var agent = $.browser;
			var userAgent = {
				version : agent.version,
				blockVersion : _config.uaVersion
			};
			if(_config.isBlockUa && agent.msie && parseInt(userAgent.version) < parseInt(userAgent.blockVersion)){
			// if( agent.mozilla ){
				__action.__blockEarlyUa(userAgent.version);
			}
			else{
				__action.__formInit();
			}
				
			$(window).resize(function(e) {
				if(resizeTimer){
					clearTimeout(resizeTimer); 
				}
				resizeTimer = setTimeout(function(){__action.__pageHeight()},500);
			});

		},
		
		__pageHeight : function(){
			var $window = $(window);
			var windowHeight = $(window).height();
			var $body = $('body');
			var _config = config;
			if(parseInt(windowHeight) < 574) {
				$body.height('574');
			}
			else{
				$body.height(windowHeight);
			}

		},
		
		__formInit : function(){
			var $formInit = require('./forminit');
			$formInit.init();
		},
		
		__creatCssLink : function(url){
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			$("head")[0].appendChild(link);
		},
		
		__blockEarlyUa : function(version){
			var $block = require('./blockua')
			$block.blockIE(version);
		}
	};
	
	var outInterFace = {
		init : function(){
			__action.__pageInit();
			__action.log('page init')
		},
		creatCssLink : function(url){
			__action.__creatCssLink(url);
		}
	};
	
	return outInterFace ;
	
});