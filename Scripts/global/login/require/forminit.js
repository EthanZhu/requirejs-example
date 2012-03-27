define(['require',
		'config',
		'./tipmessage',
		'./initpassword'
		],function(require,config,tipMessage,initPassword){
	
	var _inputClass = config.inputClass,
		_labelClass = config.labelClass,
		_formItem = config.formItem,
		_formID = config.formID,
		_rememberLabel = config.rememberLabel,
		_rememberBox = config.rememberBox,
		_submitButton = config.submitButton,
		_submitMaster = config.submitMaster;
		
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
				// //console.log.apply('', arguments); // ie 报错
		// },
		
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__inputInit : function(){
			
				this.log('input init start');
				$( _formID + ' ' + _inputClass ).each(function () {
						var items = $(this).parent( _formItem);
						//__action.log(items);
						$(this).on('keypress focusin focusout blur change', function (event) {
								var type = event.type; //获取事件类型 
							//alert(type);
								if ($(this).attr("id") == "userpass") {
									config.isInputPass = true;
								}
								if (type == 'keypress'){
									items.children(_labelClass).addClass('vh');
								}
								else if (type == 'focusin') {
									if (items.hasClass('error')) {
										$(this).val("");
										items.children( _labelClass ).removeClass('vh');
										items.removeClass('error');
									}
								//alert(items.index());
									var _tipIndex = items.index();
									var _tiphtml = null ;
									if(_tipIndex==0) {
											_tiphtml = config.nameTipHtml;
										}else if(_tipIndex==1){ 
											_tiphtml = config.passTipHtml;
										}
									if(_tiphtml){ 
											__action.__focusTipMessage(_tipIndex,_tiphtml,0);
										}
									items.addClass('focus');
								}
								else if(type=="focusout"){
									items.removeClass('onshow');
								}
								else if (!$(this).val()) {
									items.children( _labelClass ).removeClass('vh');
									items.removeClass('focus correct onshow');
								}
							})
					});
		},
		
		__boxChangeChecked : function(objBox,isChecked){
			this.log( objBox+"'s attribute checked changed from "+ isChecked );
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
			
			var _events = $(_rememberLabel).data('events');
			var _eventClick = null;
			if(!_events){
				this.__rememberBind();
			}else{
				_eventClick = _events['click'];
				//this.log(_eventClick);
				if(!_eventClick)
					this.__rememberBind();
			}
		},
		
		__rememberBind : function(){
			this.log(_rememberLabel +' have been binded click event ');
			$(_rememberLabel).on('click',function(){
				var _this = __action;
				_this.log(_rememberLabel+" have been clicked");
				_this.__boxChangeChecked( _rememberBox , $(_rememberBox).attr('checked') );
			});
		},
		
		__setInputValue : function(inputs){
			this.log('set input values from cookie')
			$(config.nameInput).val(inputs.username);
			$(config.passInput).val(inputs.password);
			this.__checkInputValue();
		},	
		
		__checkInputValue : function(){
			this.log('check input styles');
			$(_formItem).each(function(){
				if($(this).children(_inputClass).val()){
					$(this).addClass("focus");
					$(this).children(_labelClass).addClass('vh');
				}
			})
		},
		__disabledInput : function(){
			$(_formID+' input').attr('disabled', true);
			$(_rememberLabel).off('click');
			$(_submitButton).off('click');
		},
		__enabledInput : function(){
			$(_formID+' input').attr('disabled', false);
			this.__rememberBind();
			$(_submitMaster).removeClass("visibility");
		},
		__focusTipMessage : function(_index,_tipHtml,_tipNum){
			tipMessage.focusTipMessage(_index,_tipHtml,_tipNum);
		},
		__initPassword : function(){
			initPassword.init();
		}
		
	}
	
	return outIterFace ;
})
