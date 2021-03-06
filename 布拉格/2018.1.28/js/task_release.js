var task_index;
  //这里的script是用在任务发布的form上的
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  //日期
  laydate.render({
    elem: '#start_date'
  });
  laydate.render({
    elem: '#end_date'
  });
  
  var index=layedit.build('task_introduction',{height:100}); //建立编辑器,index为执行build后返回的索引，用于获取富文本编辑器的内容
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
	/*
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
   */
    
	//检查和获取优先级
	function getpriority()
	{
		var checks = document.getElementsByName("superior");
                                 var priority = -1;
                                  for (i = 0; i < checks.length; i++) {
									   priority++;
                                      if (checks[i].checked) {
                                         return(checks[i].value);
                                      }
                                  }
                                  if (priority == checks.length) {
									  alert("请确认优先级");//感觉不用验证但保险起见还是放在这了
                                      return "";
									}
	}       

	//用于将发布任务页面的表单转换为json格式发送到后端
    function onclick_sumit(){  
			var json_info;
            //表单验证部分
/////////////////////////////////////////////////////////////////////////////////////////////
        
        //task_title
            var task_title=document.forms["task_release_form"]["task_title"].value;
            if(task_title.length<5||task_title.length>15)
            {
                alert("任务名需为5-15个字符");
                return false; 
            }
            if(!isNaN(task_title))
            {
                alert("任务名不能为纯数字");
                return false; 
            }        
            if( filterSqlStr(task_title))
            {  
                alert("任务名中包含了敏感字符"+sql_str()+",请重新输入！");  
                return false;  
            } 
            
            
       //task_introduction
			var task_introduction=layui.layedit.getContent(task_index);
            if(task_introduction.length<5)
            {
                alert("任务简介至少需含5个字符");
                return false; 
            }
            if(task_introduction.length>512)
            {
                alert("任务简介至多可含512个字符");
                return false; 
            }     
            if( filterSqlStr(task_introduction))
            {  
                alert("任务名中包含了敏感字符"+sql_str()+",请重新输入！");  
                return ;  
            } 
			
				json_info={"state":"insert_task","data":{
														"name":task_title,
														"introduction":task_introduction
														}
					      };
			json_info.data.subtasks=new Array();
			json_info.data.members=new Array();
        //sub_task and pic
            var blog_i=1;
            for(blog_i;blog_i<=sub_task_flag;blog_i++)//此处引用了add_and_drop中的全局变量sub_task_flag
            {
                var form_subtask=document.forms["task_release_form"]['sub_task'+blog_i].value;
				var temp={"name":form_subtask};
				temp.members=new Array();
				//alert(JSON.stringify(temp));
				json_info.data.subtasks.push(temp);
				//json_info.data.subtasks[blog_i].members=new Array();
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
				json_info.data.subtasks[blog_i-1].members.push(form_worker);//这里blog_i比数组下标大1！
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
			
			//time_order
			var task_start_date=document.forms["task_release_form"]["start_date"].value;
			var task_end_date=document.forms["task_release_form"]["end_date"].value;
            var start_time=stringToDate(task_start_date);
            var end_time=stringToDate(task_end_date);
            if(end_time<=start_time)
            {
                alert('开始时间不应迟于或等于结束时间.');
                return false; 
            }
       
////////////////////////////////////////////////////////////////////////////////////////////
            //表单验证部分结束
			 /*提交的json数据
    			var json_info={"state":"insert_task",
							"data":{
									"builder":"aa",
									"name":task_title,
									"introduction":task_introduction,
									"start_date":,
									"end_date":,
									"priority":,
									"members":[],
									"subtasks":[{
													"name":,
													"start_date":,
													"end_date":,
													"members":[],
												}]
									}
						   };
    */
			json_info.data.builder=getCookie("username");
			json_info.data.priority=getpriority();
			alert(json_info.data.priority);
			json_info.data.start_date=task_start_date;
			json_info.data.end_date=task_end_date;
			var res=JSON.stringify(json_info);
			alert(res);
			//ajax提交json数据
			$.ajax({
					type: "POST",
					dataType: "json",
					url: "php/task.php" ,
					data: {res:res},
					success: function (data) {
					  if(data.success=="false"){
						alert(data.error);
					  }
					  else {
						  alert("任务发布成功");
					  }
					},
					error : function() {
					 alert('Error loading XML document');  
					}
				  });
    }  
	
	
	
	
	
	
	
	
	
	//用于重置富文本编辑器的内容
	function onclick_reset(){  
            layui.layedit.setContent(task_index,"");
    }  



    

//防sql注入模块
//////////////////////////////////////////////////////////////////////////////////////////
           // <!-- 过滤一些敏感字符函数 -->  
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


///////////////////////////////////////////////////////////////////////////////////////
var stringToDate = function(dateStr,separator){ 
                            if(!separator){ 
                                separator="-"; 
                            } 
                            var dateArr = dateStr.split(separator); 
                            var year = parseInt(dateArr[0]); 
                            var month; 
                            //处理月份为04这样的情况
                            if(dateArr[1].indexOf("0") == 0){ 
                                month = parseInt(dateArr[1].substring(1)); 
                            }else{ 
                                 month = parseInt(dateArr[1]); 
                            } 
                            var day = parseInt(dateArr[2]); 
                            var date = new Date(year,month -1,day); 
                            return date; 
                        }  



