define(['require','config','./blockua','./forminit'],function(require,config){
	
	var resizeTimer = config.resizeTimer;
	
	var __action = {
		log : function(info){
			var _config = config;
			try{
				if(_config.debug)
					console.log(info);
			}finally{
				info = _config = null;
			}
			
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
			try{
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
				
			}finally{
				_config = agent = userAgent = null;
			}
		},
		
		__pageHeight : function(){
			var $window = $(window);
			var windowHeight = $(window).height();
			var $body = $('body');
			var _config = config;
			try{
				if(parseInt(windowHeight) < 574) {
					$body.height('574');
				}
				else{
					$body.height(windowHeight);
				}
			}finally{
				$window = windowHeight = $body = _config = null;
			}

		},
		
		__formInit : function(){
			var $formInit = require('./forminit');
			$formInit.init();
			$formInit = null ;
		},
		
		__creatCssLink : function(url){
			var link = document.createElement("link");
			try{
				link.type = "text/css";
				link.rel = "stylesheet";
				link.href = url;
				$("head")[0].appendChild(link);
			}finally{
				link = null;
			}
		},
		
		__blockEarlyUa : function(version){
			var $block = require('./blockua')
			$block.blockIE(version);
			$block = null;
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