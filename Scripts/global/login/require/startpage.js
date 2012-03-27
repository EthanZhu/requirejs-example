define(['require', 'config', './block.ua', './forminit'],function(require,config,block,initForm) {
	var resizeTimer = config.resizeTimer;
	
	var __action = {
		// log : function () {
			// if (config.debug)
				// console.log('', arguments);
		// },
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__pageInit : function(){
			$('body').focus();
			
			$(window).resize(function(e) {
					if(resizeTimer){
							clearTimeout(resizeTimer); 
					}
					resizeTimer = setTimeout(function(){__action.__pageHeight()},500);
				}
			);
			
			__action.__pageHeight();
			
			var agent = $.browser ;
			var version = agent.version;
			var blockVersion = config.uaVersion;
			
			if(config.isBlockUa && agent.msie && parseInt(version) < parseInt(blockVersion)){
			// if( agent.mozilla ){	
				__action.__blockEarlyUa(version);
			}
			else{
				__action.__formInit();
			}
		},
		__pageHeight : function(){
			this.log('__pageHeight');
			var windowHeight = $(window).height();
			this.log('pageHeight:'+windowHeight);
			if(windowHeight<574){
				$('body').height('574');
			}else{
				$('body').height(windowHeight);
			}
		},
		

		__creatCssLink	:	function(url){
			
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			$("head")[0].appendChild(link);
    		
		},

		
		__blockEarlyUa : function(version){
			this.log('__blockEarlyUa is running');
			var _block = require('./block.ua')
			_block.blockIE(version);
		},
		
		__formInit : function(){
			//var formInit = require('./forminit');
			initForm.init();
		}
	};
	
	var outInterFace = {
		init:function(){
			__action.__pageInit();
		},
		creatCssLink : function(url){
			__action.__creatCssLink(url);
		}
	};
	
	return outInterFace;
	
})