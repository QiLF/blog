//编辑界面任务部分的初始化
function task_part_init()
{
	$('#task_edit_title').val(tasks[edit_task_i].name);
	$('#task_start_date').val(tasks[edit_task_i].start_date);
	$('#task_end_date').val(tasks[edit_task_i].end_date);
	$('#superior1').attr("checked",false);//2.6 edit
	$('input[id="superior'+tasks[edit_task_i].priority+'"]').attr("checked",true);//2.6 edit
}


//删除按钮被点击，提交删除请求并刷新
function delete_task()
{
		layer.open({
		  content: '真的要删除此任务吗？'
		  ,btn: ['确认', '取消']
		  ,yes: function(index, layero){
			  
								//按钮【按钮一】的回调
								var temp={"state":"delete_task","data":{"task_id":tasks[edit_task_i].task_id}};
								var str=JSON.stringify(temp);
								//alert("提交删除请求的json："+str);
								$.ajax({
										url: "php/task.php",
										type: "POST",
										data:{res:str},
										dataType: "json",
										error: function()
										{
														//alert('Error loading XML document');
										},
										success: function(data)
										{
														if(data.success=="true")
														{
																//alert(current_group_id);
																get_tasks(current_group_id);//提交删除后进行刷新
																layer.msg("删除任务操作成功！");
																$("#form_undo").click();
																$("#return").click();
														}
														else
														{
																//alert(data.error);
														}
										}
								});
								layer.close(index);
		  }
		  ,btn2: function(index, layero){
			//按钮【按钮二】的回调
			
			//return false 开启该代码可禁止点击该按钮关闭
		  }
		  ,cancel: function(){ 
			//右上角关闭回调
			
			//return false 开启该代码可禁止点击该按钮关闭
		  }
		});
}

//完成任务按钮被点击，提交完成任务请求并刷新
function complete_task()
{
	var temp={"state":"update_task","data":{"task_id":tasks[edit_task_i].task_id}};
	var msg;
	if(tasks[edit_task_i].state=="1"){
		temp.data.state="2";
		msg="任务已重设未未完成状态，快去做任务吧";
	}else{
		temp.data.state="1";
		msg="恭喜任务完成！";
	}
	var str=JSON.stringify(temp);
	//alert("提交完成任务请求的json："+str);

				$.ajax({
						url: "php/task.php",
						type: "POST",
						data:{res:str},
						dataType: "json",
						error: function()
						{
										//alert('Error loading XML document');
						},
						success: function(data)
						{
										if(data.success=="true")
										{
												//alert(current_group_id);
												get_tasks(current_group_id);//任务完成后进行刷新
												layui.layer.msg(msg);
												$("#return").click();
										}
										else
										{
												//alert(data.error);
										}
						}
				});
}

//检查和获取优先级
function getpriority()
{
	var checks = document.getElementsByName("superior");
	var priority = 0;
	for (i = 0; i < checks.length; i++)
	{
		priority++;
		if (checks[i].checked)
		{
			return(priority);
		}
	}
	if (priority == checks.length)
	{
		layer.msg("请确认优先级");//感觉不用验证但保险起见还是放在这了
		return "";
	}
}

//用于将发布任务页面的表单转换为json格式发送到后端
	function update_task()
	{
					var json_info;


					//表单验证部分
					//////////////////////////////////////////////////////////////////////////////
					//task_title
					var task_title=document.forms["task_edit_form"]["task_edit_title"].value;
					if(task_title==""||task_title==null)
					{
							layer.msg("任务名不得为空");
							return false;
					}					
					if(task_title.length<5||task_title.length>32)
					{
							layer.msg("任务名需为5-32个字符");
							return false;
					}
					if(!isNaN(task_title))
					{
							layer.msg("任务名不能为纯数字");
							return false;
					}
					if( filterSqlStr(task_title))
					{
							layer.msg("任务名中包含了敏感字符"+sql_str()+",请重新输入！");
							return false;
					}


					//task_introduction
					var task_introduction=layui.layedit.getContent(task_show_index);
					if(task_introduction==""||task_introduction==null)
					{
							layer.msg("任务简介不得为空");
							return false;
					}
					if(task_introduction.length<5)
					{
							layer.msg("任务简介至少需含5个字符");
							return false;
					}
					if(task_introduction.length>512)
					{
							layer.msg("任务简介至多可含512个字符");
							return false;
					}
					if( filterSqlStr(task_introduction))
					{
							layer.msg("任务名中包含了敏感字符"+sql_str()+",请重新输入！");
							return ;
					}


					//在验证的时候顺便赋值了
					json_info=
					{
						"state":"update_task",
						"data":
						{
							"name":task_title,
							"introduction":task_introduction,
							"task_id":tasks[edit_task_i].task_id
						}
					};

					//time_order
					var task_start_date=document.forms["task_edit_form"]["task_start_date"].value;
					var task_end_date=document.forms["task_edit_form"]["task_end_date"].value;
					var start_time=stringToDate(task_start_date);
					var end_time=stringToDate(task_end_date);
					if(end_time<=start_time)
					{
							layer.msg('开始时间不应迟于或等于结束时间.');
							return false;
					}
					////////////////////////////////////////////////////////////////////////////////
								//表单验证结束


					json_info.data.priority=getpriority();
					json_info.data.start_date=task_start_date;
					json_info.data.end_date=task_end_date;
					var res=JSON.stringify(json_info);
					//alert("任务更新请求为"+res);
					//ajax提交json数据
					$.ajax({
							type: "POST",
							dataType: "json",
							url: "php/task.php" ,
							data: {res:res},
							success: function (data)
							{
								if(data.success=="false")
								{
									//alert(data.error);
								}
								else
								{
									memorize_new_subtask(-1);//记住全部追加子项
									display_flag=false;
									fresh_flag=true;
									get_tasks(current_group_id);//提交修改后进行刷新
									
									//修改后任务预览也进行响应
									
									
									layer.msg("任务修改成功");
								}
							},
							error : function()
							{
								//alert('Error loading XML document');
							}
					});
		}





	//用于重置富文本编辑器的内容
	function onclick_reset()
	{
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
