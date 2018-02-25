var history_tasks=new Array();
//历史任务数及每个历史任务的子项数
var history_task_num=0;
var history_sub_task_num=new Array();
//历史任务进度
var history_task_percent=new Array();
/*
 $(document).ready(function(){
	 get_history_tasks();
 });
*/
 //获取个人历史任务信息
  function get_history_tasks(value)
  {
	   if(current_group_id==null){
		  layer.msg("请先选择团队");
		  layui.element.tabChange('main-tab','task-reminder');
		  return;
	  }
	  history_tasks.splice(0,history_tasks.length);	//清空个人历史任务数组
	  history_task_percent.splice(0,history_task_percent.length);//清空历史任务进度数组
	  history_task_num=0;
	  history_sub_task_num.splice(0,history_sub_task_num.length);//清空子项数量数组
	  document.getElementById('task_h_part').innerHTML="";
	  document.getElementById('task_h_title_part').innerHTML="";
	  var res={
				"state":"get_result",
				 "data":{
              "group_id":value,
						  "member":getCookie("username"),
						  "state":"1",
						  "order":"DESC",
						  "order_by":"real_end_time"
						}
			  };
	  var str=JSON.stringify(res);
	  //layer.msg("向后端传入的json数据为"+str);
	  $.ajax({
             url: "php/search_tasks.php",
             type: "POST",
             data:{res:str},
			       dataType: "json",
             error: function(){
               layer.msg('数据请求失败');
             },
             success: function(data){
				        if(data.success=="true"){
					        for(var i=0;i<data.res.length;i++){
						        history_tasks.push(data.res[i]);
					        }
					        //获取任务数及每个任务的子项数
					        history_task_num=history_tasks.length;
					        for(var i=0;i<history_task_num;i++)
					        {
						        if(history_tasks[i].subtasks!=undefined){
						          history_sub_task_num[i]=history_tasks[i].subtasks.length;
						        }
                    else{
							        history_sub_task_num[i]=0;
						        }

					        }
      						//加载任务历史
      						init_task_h_part(history_task_num);
      						if(document.getElementById('task_h_part').innerHTML==""){
      						  document.getElementById('task_h_part').innerHTML=="还没有任务完成记录，快去帮团队做任务吧！"
      						}
      						total_task_h(history_task_num);
      						//为历史任务条设置进度
      						set_history_task_percent();
      						layui.element.render('history-tab');
      						//切换到历史任务一
							    if(task_num>0){
										layui.element.tabChange('history-tab', history_tasks[0].task_id);
									}
				        }
                else{
        					//如果查询任务记录为空
        					if(data.error=="start_index exceeds number of rows")
        					{
        						document.getElementById('task_h_part').innerHTML="<div class='layui-text'>无历史记录</div>";
        					}
        					//layer.msg(data.error);
				        }
			       }
		});
  }


/**********************************************************任务历史所用函数************************************************************************/
/*
函数说明：初始化选项卡的完成历史模块
参数：历史任务数目
返回：无
*/
function init_task_h_part(history_task_num)
{
	for(var i=1;i<=history_task_num;i++)
	{
		add_one_history_task(i);
	}
	total_task_h(history_task_num);
}



/*
函数说明：添加一个选项卡标题及内容
参数：任务数目
返回：无
*/
function add_one_history_task(task_label)
{
	var priority=new Array("极高","高","中","低","极低");
	var other_content_id="task_h"+task_label;
	var task_description_id="task_h"+task_label+"_description";
	var content= "<div style='position:relative;float:none'>"
				+	"<div class='layui-text' >任务名称:"+history_tasks[task_label-1].name+"</div>"
				+	"<a style='cursor:pointer' onclick="+"change_display('"+task_description_id+"');>"
				+		"<i class='layui-icon' style='font-size: 30px; color: #1E9FFF;'>&#xe63c;</i><span>任务详情</span>"
				+	"</a>"
				+	"<div class=' layui-text' id='task_h"+task_label+"_description' style='display:none;'>"
				+		"<div class='layui-timeline-title' >任务简介:"+history_tasks[task_label-1].introduction+"</div>"
				+		"<div class='layui-timeline-title' >开始日期:"+history_tasks[task_label-1].start_date+"  截止日期:"+history_tasks[task_label-1].end_date+"</div>"
				+		"<div class='layui-timeline-title' >优先级:"+priority[history_tasks[task_label-1].priority-1]+"</div>"
				+		"<div class='layui-timeline-title' >"
				+       	"<i class='layui-icon' style='font-size: 30px; color: #FF5722;'>&#xe756;</i>"
				+			"参与成员："+history_tasks[task_label-1].members
				+		"</div>"
				+ 	"</div>"
				+  "<div id='"+other_content_id+"'</div>"
				+"</div>";
	layui.element.tabAdd('history-tab',
						 {
								title: history_tasks[task_label-1].name//'历史任务'+task_label
								,content: content //支持传入html
								,id: history_tasks[task_label-1].task_id//lay-id属性
						 });
	add_progress_bar("task_h",task_label);
	$("#"+other_content_id).append(
									"<div class='layui-field-box' style='position:relative;'>"
										+"<p style='float:left;'>历史回顾</p>     <p style='float:right;'>完成情况</p>"
										+"<br/>"
									+"</div>"
									);
	add_total_sub_task_h(task_label,history_sub_task_num[task_label-1]);
}

/*
函数说明：向一个历史任务的内容中添加所有子项及子项内容
参数：任务编号，子项数量
返回：无
*/

function add_total_sub_task_h(task_label,sub_task_num)
{
	$("#task_h"+task_label).append("<ul class='layui-timeline' id='task_list_h"+task_label+"'></ul>");
	for(var i=1;i<=sub_task_num;i++)
	{
		add_one_sub_task_h(task_label,i);
	}
	//layer.msg(ok);
}


/*
函数说明：向选项卡的任务历史模块中一个历史任务的中添加一个子项及子项内容
参数：历史任务编号，子项编号
返回：无
*/
function add_one_sub_task_h(task_label,sub_task_label)
{
	var sub_task_id="sub_task_h"+task_label+"-"+sub_task_label;
	var sub_task_content_id="sub_task_h"+task_label+"-"+sub_task_label+"_content";
	var face_id="face_h"+task_label+"-"+sub_task_label;
	var task_list_id="task_list_h"+task_label;
	var evaluation;
	if(history_tasks[task_label-1].subtasks[sub_task_label-1].evaluation==-1){
		evaluation="待评价";
	}else{
		evaluation="<span style='color:#FFB800;font-size:20px'>"+history_tasks[task_label-1].subtasks[sub_task_label-1].evaluation+"</span> 分"
	}
	var real_end_time;
	if(history_tasks[task_label-1].subtasks[sub_task_label-1].real_end_time==undefined||history_tasks[task_label-1].subtasks[sub_task_label-1].real_end_time==null){
		real_end_time="尚未完成";
	}else{
		real_end_time=history_tasks[task_label-1].subtasks[sub_task_label-1].real_end_time.slice(0,10);
	}
	$("#"+task_list_id).append(
										"<li class='layui-timeline-item'>"
											+"<a onclick="+"change_display('"+sub_task_content_id+"');><i class='layui-icon layui-timeline-axis'></i></a>"
											+"<div class='layui-timeline-content layui-text' >"
											+	"<div class='layui-timeline-title' id='"+sub_task_id+"'>"
											+		"子项名称："+history_tasks[task_label-1].subtasks[sub_task_label-1].name
											+		"<span id='"+face_id+"'></span>"
											+	"</div>"
											+	"<div id='"+sub_task_content_id+"' style='display:none'>"
											+		"<div class='layui-timeline-title' >开始时间："+history_tasks[task_label-1].subtasks[sub_task_label-1].start_date+ "</div>"
											+		"<div class='layui-timeline-title' >截止时间："+history_tasks[task_label-1].subtasks[sub_task_label-1].end_date+ "</div>"
											+		"<div class='layui-timeline-title' >完成时间："+real_end_time+ "</div>"
											+		"<div class='layui-timeline-title'>负责人："+history_tasks[task_label-1].subtasks[sub_task_label-1].members+"</div>"
											+		"<div class='layui-timeline-title'>评价："+evaluation+"</div>"
											+	"</div>"
											+"</div>"
										+"</li>"
	 						   );
}


/*
函数说明：某个历史任务下所有子项完成情况及进度条的初始化
参数：任务编号
返回：无
*/
function total_sub_task_h(task_label)
{
	var sub_finish_num=0;
	var percent=0;
       for(var i=0;i<history_sub_task_num[task_label-1];i++)
	   {
		  var is_finished=history_tasks[task_label-1].subtasks[i].state;
	      change_one_face('face_h'+task_label+'-'+(i+1),is_finished);
		  if(is_finished==1)sub_finish_num++;
	   }
	   percent=sub_finish_num/history_sub_task_num[task_label-1];
	   history_task_percent.push((percent.toFixed(2)*100)+"%");
}

/*
函数说明：对所有历史任务完成情况的初始化
参数：历史任务数目
返回：无
*/
function total_task_h(task_h_num)
{
		for(var i=1;i<=task_h_num;i++)
		{
		   total_sub_task_h(i);
		}
}
//函数说明:为所有历史任务条设置进度
function set_history_task_percent()
{
	for(var i=1;i<=history_task_num;i++)
	{
		document.getElementById("task_h_bar"+i).innerHTML="<div   class='layui-progress-bar layui-bg-red' lay-percent="+history_task_percent[i-1]+"></div>";
	}
}
