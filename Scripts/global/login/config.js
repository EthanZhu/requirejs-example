define({
	//formAction : '#form-inputs',
	formID : '#form-inputs',
	formItem : '.form-item',
	inputClass : '.form-input',
	labelClass : '.form-label',
	tipClass : '.form-tip',
	rememberBox : '#remember-box',
	rememberLabel : '#remember-label',
	submitButton : '#submitButton',
	submitMaster : '.btn-master',
	isRemember : false,
	isInputPass	: true,
	nameInput		: '#username',
	passInput		: '#userpass',
	nameTip 		: false, //
	passTip 		: false, //
	loginUrl : '/common/checkLogin.ashx',
	mainUrl	: '/Defaul.aspx',
	resizeTimer	: null,
	nameTipHtml 	: new Array("5-18位，禁止纯数字和特殊字符", "用户名不能为空，请输入。", "用户名长度小于5位", "用户名长度超过18位", "用户名含有纯数字或特殊字符", "您输入的用户名不存在", "密码错误超过5次", "错误，请检查网络或服务器设置"),
	passTipHtml 	: new Array("密 码：6-20位，禁止特殊字符", "密码不能为空，请输入。", "密码长度小于6位", "密码长度大于20位", "密码中含有非法字符", "密码输入错误。"),
	isBlockUa		: true,
	uaVersion       : '6.0',//lt 8.0
	debug : true,
	inputTipNums : {
		nameNum : 0,
		passNum : 0,
		codeNum : 0
	}
});
