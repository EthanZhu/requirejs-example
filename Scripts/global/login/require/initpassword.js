define(['require',
		'config',
		'./forminit',
		'./submitinfo'
		,'jquery.cookie'],function(require,config){
	
	//var config = require('config');
	var _initInput = null,
		_submitInfo = null;
	//var submitInfo = require('./submitinfo');

	var outInterFace = {
		init : function(){
			require(['jquery.cookie'],function(){
				__action.__loadCookieInfo();
			})
		},
		success : function(_inputs,tag){
			require(['jquery.cookie'],function(){
				__action.__successLogin(_inputs,tag);
			})
		}
	}
	
	var __action = {

		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__loadCookieInfo : function(){
			var isLogout = $.cookie('isLogout');
			var cookieRemember = $.cookie('remember');
			_initInput = require('./forminit')
			this.log('load cookie informations')
			if(cookieRemember){
				var _inputs = {
						username : '',
						password : '',
						remember : ''
					}
				_inputs.username = $.cookie("username");
				_inputs.remember = $.cookie("remember");
				if (isLogout) {
					$.cookie("isLogout", null)
				}else{
					_inputs.password = $.cookie("password");
					config.isInputPass = false;
				}
				this.log(_inputs)
				config.isRemember = true;
				_initInput.rememberInit();
				_initInput.setInputValue(_inputs);
			}
			this.__submitInfo();
		},
		
		__submitInfo : function(){
			_submitInfo = require('./submitinfo')
			_submitInfo.init();
		},
		
		__successLogin : function(params,tag){
			if(params.remember){
				$.cookie('username', params.username, { expires: 7, path:'/' });
				$.cookie('password', params.password, { expires: 7, path:'/' });
				$.cookie('remember', params.remember, { expires: 7, path:'/' });
			}else{
				$.cookie('username', null,{ expires: -1, path:'/' });
				$.cookie('password', null,{ expires: -1, path:'/' });
				$.cookie('remember', null,{ expires: -1, path:'/' });
			}
		}
		
	}
	
	return outInterFace;
	
})
