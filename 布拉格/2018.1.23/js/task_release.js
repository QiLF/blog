var task_index;
var json_info;
  //这里的script是用在任务发布的form上的
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  //日期
  laydate.render({
    elem: '#task_start_time'
  });
  laydate.render({
    elem: '#task_end_time'
  });
  
  var index=layedit.build('task_description',{height:100}); //建立编辑器,index为执行build后返回的索引，用于获取富文本编辑器的内容
  task_index=index;
  //自定义验证规则
  form.verify({
    title: function(value){
      if(value.length < 5){
        return '标题至少得5个字符啊';
      }
    }
    ,pass: [/(.+){6,12}$/, '密码必须6到12位']
    ,content: function(value){
      layedit.sync(editIndex);
    }
  });
/*
  //监听指定开关
  form.on('switch(switchTest)', function(data){
    layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
      offset: '6px'
    });
    layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
  });

  //监听提交    不用layui的提交，用onClick提交
 /* form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });
*/

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
            json_info = $('#task_release_form').serializeObject();  
			json_info.task_description=layui.layedit.getContent(task_index);
			//layui.layer.alert(JSON.stringify(json_info));
			alert(JSON.stringify(json_info));
            JSON.stringify(json_info).submit();  
    }  
	//用于重置富文本编辑器的内容
	function onclick_reset(){  
            layui.layedit.setContent(task_index,"");
    }  

