define(['require',
		'config',
		'./tipmessage',
		'./initpassword'
		],function(require,config){
		
	var outIterFace = {
		init : function(){
			__action.__inputInit();
			__action.__rememberInit();
			__action.__checkInputValue();
			__action.__initPassword();
		},
		rememberInit : function(){
			__action.__rememberInit();
		},
		checkInputValue : function(){
			__action.__checkInputValue();
		},
		setInputValue : function(_inputs){
			__action.__setInputValue(_inputs);
		},
		disabledInput : function(){
			__action.__disabledInput();
		},
		enabledInput : function(){
			__action.__enabledInput();
		}
	};
	
	var __action = {
		
		// log : function () {
			// if (config.debug)
				// //console.log.apply('', arguments); // 
		// },
		
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__inputInit : function(){
			var _config = config;
				//this.log('input init start');
				$(_config.formID).delegate("input"+config.inputClass, "keypress focusin focusout", function(event){
					_config = config;
					var type = event.type;
					var $this = this;
					var $obj = $(this);
					var $items = $obj.parent( _config.formItem );
					if($this.type=='password') _config.isInputPass = true;
					if(type == 'keypress') $items.find(_config.labelClass).addClass('vh');
					else if(type=='focusin'){
						__action.log('focusin')
						if($items.hasClass('error')){
							$this.value='';
							$items.removeClass('error').find( _config.labelClass ).removeClass('vh');
						}
						var _tipIndex = $items.index();
						if(_tipIndex==0) _tiphtml = _config.nameTipHtml;
						else if(_tipIndex==1) _tiphtml = _config.passTipHtml;
						if(_tiphtml) __action.__focusTipMessage(_tipIndex,_tiphtml,0);
						$items.addClass('focus');
						_tipIndex = _tiphtml = null;
					}
					else if(type=="focusout") {
						if(!$this.value) $items.removeClass('focus correct onshow').find(_config.labelClass).removeClass('vh');
						else $items.removeClass('onshow');
					}
					//_config = null ;
			　　});
			_config  = null ;
			//_config = _formID = _formItem = _inputClass = _labelClass = null;

		},
		
		__boxChangeChecked : function(objBox,isChecked){
			//this.log( objBox+"'s attribute checked changed from "+ isChecked );
			if(isChecked){
				$(objBox).attr('checked',false)
			}else{
				$(objBox).attr('checked',true)
			}
		},
		
		__rememberInit	:	function(){
			var _isRemember = config.isRemember
			if( _isRemember ){
				this.__boxChangeChecked( _rememberBox , !_isRemember );
			}
			var _events = $(config.rememberLabel).data('events');
			var _eventClick = null;
			if(!_events){
				this.__rememberBind();
			}else{
				_eventClick = _events['click'];
				//this.log(_eventClick);
				if(!_eventClick)
					this.__rememberBind();
			}
			//_isRemember = _events = _eventClick = null ;
		},
		
		__rememberBind : function(){
			//this.log(_rememberLabel +' have been binded click event ');
			var _config = config;
			var _this = __action;
			$(_config.rememberLabel).on('click',function(){
				_config = config;
				//_this.log(_config.rememberLabel+" have been clicked");
				_this.__boxChangeChecked( _config.rememberBox , $(_config.rememberBox).attr('checked') );
			});
			_config = null ;
		},
		
		__setInputValue : function(inputs){
			this.log('set input values from cookie')
			var _config = config;
			$(_config.nameInput).val(inputs.username);
			$(_config.passInput).val(inputs.password);
			this.__checkInputValue();
		},	
		
		__checkInputValue : function(){
			this.log('check input styles');
			var _config = config;
			$(_config.formItem).each(function(){
				_config = config
				if($(this).find(_config.inputClass).val()){
					$(this).addClass("focus");
					$(this).find(_config.labelClass).addClass('vh');
				}
			});
			_config = null;
		},
		__disabledInput : function(){
			var _config = config;
			$(_config.formID).find('input').attr('disabled', true);
			$(_config.rememberLabel).off('click');
			$(_config.submitButton).off('click');
			//_config = null;
		},
		__enabledInput : function(){
			var _config = config
			$(_config.formID).find('input').attr('disabled', false);
			this.__rememberBind();
			$(_config.submitMaster).removeClass("visibility");
		},
		__focusTipMessage : function(_index,_tipHtml,_tipNum){
			var tipMessage = require('./tipmessage');
			tipMessage.focusTipMessage(_index,_tipHtml,_tipNum);
		},
		__initPassword : function(){
			var initPassword = require('./initpassword');
			initPassword.init();
		}
	}
	
	return outIterFace ;
})
