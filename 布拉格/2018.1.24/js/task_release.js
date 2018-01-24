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
/*
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

        
            //表单验证部分
/////////////////////////////////////////////////////////////////////////////////////////////
        
        //task_title
            var form_title=document.forms["task_release_form"]["task_title"].value;
            if(form_title.length<5||form_title.length>15)
            {
                alert("任务名需为5-15个字符");
                return false; 
            }
            if(!isNaN(form_title))
            {
                alert("任务名不能为纯数字");
                return false; 
            }        
            if( filterSqlStr(form_title))
            {  
                alert("任务名中包含了敏感字符"+sql_str()+",请重新输入！");  
                return false;  
            } 
            
            
       //task_description
            var form_description=layui.layedit.getContent(task_index);
            if(form_description.length<5)
            {
                alert("任务简介至少需含5个字符");
                return false; 
            }
            if(form_description.length>512)
            {
                alert("任务简介至多可含512个字符");
                return false; 
            }     
            if( filterSqlStr(form_description))
            {  
                alert("任务名中包含了敏感字符"+sql_str()+",请重新输入！");  
                return ;  
            } 

        //sub_task and pic
            var blog_i=1;
            for(blog_i;blog_i<=sub_task_flag;blog_i++)//此处引用了add_and_drop中的全局变量sub_task_flag
            {
                var form_subtask=document.forms["task_release_form"]['sub_task'+blog_i].value;
                if(form_subtask.length<5)
                {
                    alert('子任务'+blog_i+'的简介至少含5个字符');
                    return false; 
                }
                if(!isNaN(form_subtask))
                {
                    alert('子任务'+blog_i+'的简介不能为纯数字');
                    return false; 
                }        
                if( filterSqlStr(form_subtask))
                {  
                    alert('子任务'+blog_i+'的简介中包含了敏感字符'+sql_str()+',请重新输入！');  
                    return ;  
                } 
                
                
                
                var form_worker=document.forms["task_release_form"]['pic'+blog_i].value;
                if(form_worker.length<5)
                {
                    alert('输入的执行者'+blog_i+'的昵称至少需含5个字符');
                    return false; 
                }
                if(!isNaN(form_worker))
                {
                    alert('输入的执行者'+blog_i+'的昵称不能为纯数字');
                    return false; 
                } 
                if( filterSqlStr(form_worker))
                {  
                    alert('输入的执行者'+blog_i+'的昵称中包含了敏感字符'+sql_str()+',请重新输入！');  
                    return ;  
                }         
            } 
////////////////////////////////////////////////////////////////////////////////////////////
            //表单验证部分结束
            
            
            
            

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



    
   


    
    
    
    
    
    
    

//防sql注入模块
//////////////////////////////////////////////////////////////////////////////////////////
            <!-- 过滤一些敏感字符函数 -->  
            function filterSqlStr(value)
            {  
                
                var sqlStr=sql_str().split(',');  
                var flag=false;  
                
                for(var i=0;i<sqlStr.length;i++)
                {  
                    
                    if(value.toLowerCase().indexOf(sqlStr[i])!=-1)
                    {  
                        flag=true;  
                        break;  
                    }  
                }  
                return flag;  
            }  
            
            
            function sql_str(){  
                var str="and,delete,or,exec,insert,select,union,update,count,*,',join";  //因为富文本编辑器需要，删去了<和>。
                return str;  
            }  
///////////////////////////////////////////////////////////////////////////////////////////






