//日志发布
var log_index;
	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  log_index=layedit.build('log_content'); //建立编辑器
	});


	//用于将表单的输入数据转换为json对象
    $.fn.serializeObject = function()    
    {    
       var object = {};    
       var temp = this.serializeArray();    
       $.each(temp, function() {    
           if (object[this.name]) {    
               if (!object[this.name].push) {    
                   object[this.name] = [object[this.name]];    
               }    
               object[this.name].push(this.value || '');    
           } else {    
               object[this.name] = this.value || '';    
           }    
       });    
       return object;    
    };  
     //用于获取富文本编辑器的内容，添加到表单的json数据中，提交 
    function onclick_sumit(){  
            json_info = $('#log_release_form').serializeObject();  
			json_info.log_content=layui.layedit.getContent(log_index);
			//layui.layer.alert(JSON.stringify(json_info));
			alert(JSON.stringify(json_info));
            JSON.stringify(json_info).submit();  
    }  
	//用于重置富文本编辑器的内容
	function onclick_reset(){  
            layui.layedit.setContent(log_index,"");
    }  