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
});


	//检查和获取优先级
	function getpriority()
	{
		var checks = document.getElementsByName("superior");
                                 var priority = -1;
                                  for (i = 0; i < checks.length; i++)
                                  {
									                    priority++;
                                      if (checks[i].checked)
                                      {
                                         return(priority+1);
                                      }
                                  }
                                  if (priority == checks.length) {
									  alert("请确认优先级");//感觉不用验证但保险起见还是放在这了
                                      return -1;
									}
	}

	//用于将发布任务页面的表单转换为json格式发送到后端
    function onclick_sumit()
    {
			     var json_info;
            //表单验证部分
        /////////////////////////////////////////////////////////////////////////////////////////////

        //task_title
            var task_title=document.forms["task_release_form"]["task_title"].value;
			if(task_title==""||task_title==null)
            {
                alert("任务名不得为空");
                return false;
            }
            if(task_title.length<5||task_title.length>32)
            {
                alert("任务名需为5-32个字符");
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
                if(form_subtask==""||form_subtask==null)
                {
                    alert('子任务'+blog_i+'的名称不得为空');
                    return false;
                }				
                if(form_subtask.length<5||form_subtask.length>32)
                {
                    alert('子任务'+blog_i+'的名称需为5-32个字符');
                    return false;
                }
                if(!isNaN(form_subtask))
                {
                    alert('子任务'+blog_i+'的名称不能为纯数字');
                    return false;
                }
                if( filterSqlStr(form_subtask))
                {
                    alert('子任务'+blog_i+'的名称中包含了敏感字符'+sql_str()+',请重新输入！');
                    return ;
                }



                var form_worker=document.forms["task_release_form"]['pic'+blog_i].value;
		        		json_info.data.subtasks[blog_i-1].members.push(form_worker);//这里blog_i比数组下标大1！
				if(form_worker==""||form_worker==null)
                {
                    alert('输入的执行者'+blog_i+'的用户名不得为空');
                    return false;
                }
                if(form_worker.length<5form_worker.length>32)
                {
                    alert('输入的执行者'+blog_i+'的用户名需为5-32个字符');
                    return false;
                }
                if(!isNaN(form_worker))
                {
                    alert('输入的执行者'+blog_i+'的用户名不能为纯数字');
                    return false;
                }
                if( filterSqlStr(form_worker))
                {
                    alert('输入的执行者'+blog_i+'的用户名中包含了敏感字符'+sql_str()+',请重新输入！');
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

            json_info.data.members=window.parent.current_members;//获取当前选中团队的成员
            json_info.data.group_id=window.parent.current_group_id; //获取当前选中的团队id
      			json_info.data.builder=getCookie("username");
      			json_info.data.priority=getpriority();
      			//alert(json_info.data.priority);
      			json_info.data.start_date=task_start_date;
      			json_info.data.end_date=task_end_date;
            for(var i=0;i<json_info.data.subtasks.length;i++)
            {
              json_info.data.subtasks[i].start_date=task_start_date;
              json_info.data.subtasks[i].end_date=task_end_date;
            }
      			var res=JSON.stringify(json_info);
      			//alert(res);
      			//ajax提交json数据
      			$.ajax({
      					type: "POST",
      					dataType: "json",
      					url: "php/task.php" ,
      					data: {res:res},
      					success: function (data) {
      					  if(data.success=="false"){
      						//alert(data.error);
      					  }
      					  else {
							  success_flag=true;
      						  alert("任务发布成功");
							  var index = parent.layer.getFrameIndex(window.name); //获取窗口索引  
							  parent.layer.close(index);
							  //parent.layer.close(layer.index);//关闭弹出层
      					  }
      					},
      					error : function() {
      					 //alert('Error loading XML document');
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
