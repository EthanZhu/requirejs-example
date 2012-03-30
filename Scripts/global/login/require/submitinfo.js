define(['require',
		'config',
		'./forminit',
		'./tipmessage',
		'./initpassword'
		],function(require, config){
			

	var _initInput = null ,
		_tipMessage = null ,
		_initPassword = null ;
		
	
	var _submitButton = config.submitButton;
	
	var outInterFace = {
		init : function(){
			__action.__bindButtonSubmit();
		}
	}
	

	var __action = {
		
		// log : function () {
			// if (config.debug)
				// console.log.apply('', arguments);
		// },
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__bindButtonSubmit : function(){
			$(_submitButton).on('click',function(){
				__action.__btnSubmitClick()
			});
		},
		__btnSubmitClick : function(){
			_tipMessage = require('./tipmessage');
			var _inputs = {
				username:	$("#username").val() ,
				password:	$("#userpass").val() ,
				remember:	$("#remember-box").attr('checked'),
				checkcode: null
			};
			_tipMessage.showTipMessage(_inputs)
			var _inputTipNums = config.inputTipNums;
			this.log('tip nums')
			this.log(_inputTipNums);
			
			_initInput = require('./forminit');
			
			if( !_inputTipNums.nameNum && !_inputTipNums.passNum){
				var _config = null;
				require(['jquery.md5'],function(){
					_config = config;
					var md5Pass = _inputs.password;
					if (_config.isInputPass) {
						md5Pass = $.md5(md5Pass);
						_inputs.password = md5Pass;
						$("#userpass").val(md5Pass);
						//_this.debug("user input password :"+items.isInputPass);
						_config.isInputPass = false;
					}
					this.log(_inputs);
					$(config.submitMaster).addClass("visibility");
					_initInput.disabledInput();
					__action.__ajaxCheckLogin(_inputs)
				});
				_config = null; 
			}
			
			_inputs = null;
			
		},
		__ajaxCheckLogin : function(_inputs){
			var $params ={
						username:_inputs.username,
						password:_inputs.password,
						remember:_inputs.remember
				};
			
			_initInput = require('./forminit');
			_initPassword = require('./initpassword');
			_tipMessage = require('./tipmessage');
			if(!_inputs.remember)
				$params.remember = 0;
			//this.log($params);
			// initPassword.success($params);
			// initInput.enabledInput();
			// __action.__bindButtonSubmit();
			$.ajax({
					type	:	'POST',
					contentType:'application/json',
					dataType:	'jsonp',
					url		:	config.loginUrl,
					data	:	$params,
					success	: function(data, status){
						if(data.success){
							_initPassword.success($params,true);
						}
						else{
							_initInput.enabledInput();
							var _nums = config.inputTipNums;
							_nums.nameNum = data.nameNum;
							_nums.passNum = data.passNum;
							_tipMessage.getTipMessage(0, config.nameTipHtml, _nums.nameNum);
							_tipMessage.getTipMessage(1, config.passTipHtml, _nums.passNum);
							__action.__bindButtonSubmit();
						}
						_initInput = _initPassword = _tipMessage = null;
					},
					error	: function(err){
						//_initPassword.success($params,true);
						_initInput.enabledInput();
						__action.__bindButtonSubmit();
						_tipMessage.ajaxErrorTip(0, config.nameTipHtml,7);
						alert(err.statusText);
						_initInput = _tipMessage = null;
					}
				});
			
		}
	}
	
	return outInterFace;
	
})
