define(['config','patrns'],function(config,patrns){

	var _inputClass = config.inputClass,
		_labelClass = config.labelClass,
		_formItem = config.formItem,
		_formTip = config.tipClass
		_rememberLabel = config.rememberLabel,
		_rememberBox = config.rememberBox,
		_isRemember = config.isRemember;
		
	
	var __action = {
		
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__getTipMessage : function(_index,_tipHtml,_tipNum){
			//this.log(tag)
			if(_tipNum){
					$(_formItem).eq(_index).removeClass("onshow correct").addClass("error");
					$(_formTip).eq(_index).html(_tipHtml[_tipNum]);
					return;
				}else{
					//this.log('tip '+tipHtml[tag]);
					if(_tipHtml[_tipNum]){
						$(_formItem).eq(_index).removeClass("correct").addClass("onshow");
						$(_formTip).eq(_index).html(_tipHtml[_tipNum]);
					}else{
						$(_formTip).eq(_index).html("");
						$(_formItem).eq(_index).removeClass("error onshow").addClass("correct");
					}
			}
		},
		
		__focusTipMessage : function(_index,_tipHtml,_tipNum){
			this.__getTipMessage(_index,_tipHtml,_tipNum);			
		},
		
		__getTipNum : function(checkValue,minLength,maxLength,_inputs){
			var valueLength = checkValue.length;
			var tag = null;
			if( valueLength==0 ){
					tag = 1;
				}
			if( valueLength>0 && valueLength<minLength ){
					tag = 2;
				}
			if( !config.isInputPass && _inputs=="pass" ){
					maxLength = 32;	
				}
			if( valueLength>maxLength ){
					tag = 3;
				}
			if(valueLength>(minLength-1) && valueLength<(maxLength+1)){
				if ( _inputs=="name" && !patrns.name.exec(checkValue) ){
					tag = 4;
				}else if (_inputs=="pass" && !patrns.pass.exec(checkValue)){
					tag = 4;
				}
			}
			return tag;
		},
			
		__returnTipNums : function(_inputs){
			var _nums = config.inputTipNums;
			this.log('config nums')
			this.log(_nums)
			_nums.nameNum = this.__getTipNum(_inputs.username,5,18,"name");
			_nums.passNum = this.__getTipNum(_inputs.password,6,20,"pass");
			return _nums;
		},
		
		__showTipMessage : function(_inputs){
			var _nums = this.__returnTipNums(_inputs);
			this.__getTipMessage(0,config.nameTipHtml,_nums.nameNum);
			this.__getTipMessage(1,config.passTipHtml,_nums.passNum);
		}
	}
	
	var outInterFace = {
		
		showTipMessage : function(_inputs){
			__action.__showTipMessage(_inputs);
		},
		focusTipMessage : function(_index,_tipHtml,_tipNum){
			__action.__focusTipMessage(_index,_tipHtml,_tipNum);
		},
		ajaxErrorTip : function(_index,_tipHtml,_tipNum){
			__action.__getTipMessage(_index,_tipHtml,_tipNum);
		}
		
	}
	
	return outInterFace;
})
