define(['require',
		//'config',
		'./startpage',
		'./forminit'
		],function(require,config){
	
	var __action = {
		
		__blockIE : function(version){
			require(['jquery.ui/jquery.ui.dialog'],function(){
				__action.__showUiDialog(version);
				version = null;
			});
		},
		__showUiDialog : function(version){
			var startpage = require('./startpage');
			var initInput = require('./forminit');
			startpage.creatCssLink('Content/libs/jquery.ui/blitzer/jquery.ui.core.css');
			startpage.creatCssLink('Content/libs/jquery.ui/blitzer/jquery.ui.theme.css');
			startpage.creatCssLink('Content/libs/jquery.ui/blitzer/jquery.ui.dialog.css');
			initInput.disabledInput();
			var msg = '<p>您的浏览器核心是 <strong class="red">IE'+ version +'</strong>，被禁止使用此系统。<br>' +
						'低核心的IE浏览器漏洞较多，用户体验较差，微软官方已经停止后续支持。<br>' +
						'为了账户安全和获取最佳用户体验，建议你根据自身需求升级至' +
						'<a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-8" target="_blank" class="red">' +
						'<strong>IE8.0</strong></a>以上版本或者使用 ' +
						'<a href="http://firefox.com.cn/" target="_blank" class="red"><strong>火狐</strong></a>、' +
						'<a href="http://www.google.cn/chrome/" target="_blank" class="red"><strong>Chrome</strong></a> 等浏览器</p>'
			var $dilog = $('<div id="dialog-modal"></div>').html(msg),
				$dilogHtml = $dilog.html(msg),
				$body = $('body')
				$dilogHtml.appendTo($body);
			$( "#dialog:ui-dialog" ).dialog( "destroy" );
			//alert(msg);
			$( "#dialog-modal" ).dialog({
					width:500,
					height:150,
					modal: true,
					resizable : false,// 拖动大小
					title : '您的浏览器版本较低'
			},function(){
					$body.remove($dilog);
					msg = $body = $dilogHtml = null;
			});
			$dilog = startpage = initInput = null;
			
		}
	}
	
	var outInterFace = {
		blockIE : function(version){
			__action.__blockIE(version);
		}
	};
	//require = config = null;
	return outInterFace;
	
})