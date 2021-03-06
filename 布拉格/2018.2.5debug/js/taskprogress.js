var task_num;
var sub_task_num=new Array();
//任务进度
var task_percent=new Array();

/*
函数说明：初始化任务选项卡模块
参数：
返回：无
*/
function task_progress()
{
	sub_task_num.splice(0,sub_task_num.length);
	document.getElementById("tab_title").innerHTML="";
	document.getElementById("task_part").innerHTML="";
	task_percent.splice(0,task_percent.length);//清空任务进度数组
	//获取任务数，子任务数
	task_num=tasks.length;
	for(var i=0;i<task_num;i++)
	{
		if(tasks[i].subtasks!=undefined){
		sub_task_num[i]=tasks[i].subtasks.length;
		}else{
		sub_task_num[i]=0;
		}
	}
	init_tab(task_num);
	total_task(task_num);
	//为任务条设置进度
	set_task_percent();
	layui.element.render('taskprogress-tab');
	if(task_num>0){
		layui.element.tabChange('taskprogress-tab', tasks[0].task_id);
	}else{
			document.getElementById("task_part").innerHTML='<div class="layui-text">还没有任务呢,快去发布吧</div>';
	}
}


/*
函数说明：初始化任务进度选项卡模块
参数：任务数目
返回：无
*/
function init_tab(task_num)
{
	for(var i=1;i<=task_num;i++)
	{
		add_one_task(i);
	}
}
/*
函数说明：添加一个选项卡标题及内容
参数：任务数目
返回：无
*/
function add_one_task(task_label)
{
	var priority=new Array("极高","高","中","低","极低");
	var other_content_id="task"+task_label;
	var task_description_id="task"+task_label+"_description";
	var content= "<div style='position:relative;float:none'>"
				+	"<div class='layui-text' ><span style='color:black'>任务名称:</span>"+tasks[task_label-1].name+"</div>"
				+	"<a style='cursor:pointer' onclick="+"change_display('"+task_description_id+"');>"
				+		"<i class='layui-icon' style='font-size: 30px; color: #1E9FFF;'>&#xe63c;</i><span class='layui-text' style='color:black'>任务详情</span>"
				+	"</a>"
				+	"<div class=' layui-text' id='task"+task_label+"_description' style='display:none;'>"
				+		"<div class='layui-timeline-title' ><span style='color:black'>任务简介:</span>"+tasks[task_label-1].introduction+"</div>"
				+		"<div class='layui-timeline-title' ><span style='color:black'>开始日期:</span>"+tasks[task_label-1].start_date+"  <span style='color:black'>截止日期:</span>"+tasks[task_label-1].end_date+"</div>"
				+		"<div class='layui-timeline-title' ><span style='color:black'>优先级:</span>"+priority[tasks[task_label-1].priority-1]+"</div>"
				+		"<div class='layui-timeline-title' >"
				+       	"<i class='layui-icon' style='font-size: 30px; color: #FF5722;'>&#xe756;</i>"
				+			"<span style='color:black'>参与成员：</span>"+tasks[task_label-1].members
				+		"</div>"
				+ 	"</div>"
			    +  "<div id='"+other_content_id+"'</div>"
				+"</div>";
	layui.element.tabAdd('taskprogress-tab',
						 {
								title: tasks[task_label-1].name//'任务'+task_label
								,content: content //支持传入html
								,id: tasks[task_label-1].task_id//lay-id属性
						 });
	add_progress_bar(task_label,"100%");
	$("#"+other_content_id).append(
									"<div class='layui-field-box' style='position:relative;'>"
										+"<p style='float:left;'>任务进展</p>     <p style='float:right;'>完成情况</p>"
										+"<br/>"
									+"</div>"
									);
	add_total_sub_task(task_label,sub_task_num[task_label-1]);
}

/*
函数说明：向任务选项卡的内容中添加进度条
参数：任务编号
返回：无
*/
function add_progress_bar(task_label,percent)
{
	var task_bar_id="task_bar"+task_label;
	$("#task"+task_label).append(
					"<!--进度条-->"
					+	"<div  style='margin-top:10px;margin-bottom:10px;position:relative;clear:left;' class='layui-progress layui-progress-big' id='" + task_bar_id + "' lay-filter='"+task_bar_id+"'  lay-showPercent='true'>"
					+	"	<div   class='layui-progress-bar layui-bg-red' lay-percent='100%'></div>"
					+	"</div>"
					);
}

/*
函数说明：向任务选项卡的内容中添加所有子项及其内容
参数：任务编号，子项数量
返回：无
*/

function add_total_sub_task(task_label,sub_task_num)
{
	$("#task"+task_label).append("<ul class='layui-timeline' id='task_list"+task_label+"'></ul>");
	for(var i=1;i<=sub_task_num;i++)
	{
		add_one_sub_task(task_label,i);
	}
	//alert(ok);
}


/*
函数说明：向任务选项卡的内容中添加一个子项及其内容
参数：任务对应的下拉列表的id,待添加子项在此任务中的编号
返回：无
*/
function add_one_sub_task(task_label,sub_task_label)
{
	var sub_task_id="sub_task"+task_label+"-"+sub_task_label;
	var sub_task_content_id="sub_task"+task_label+"-"+sub_task_label+"_content";
	var face_id="face"+task_label+"-"+sub_task_label;
	var task_list_id="task_list"+task_label;
	var real_end_time;//=tasks[task_label-1].subtasks[sub_task_label-1].real_end_time;
	if(tasks[task_label-1].subtasks[sub_task_label-1].real_end_time==undefined||tasks[task_label-1].subtasks[sub_task_label-1].real_end_time==null){
		real_end_time="尚未完成";
	}else{
		real_end_time=tasks[task_label-1].subtasks[sub_task_label-1].real_end_time.slice(0,10);
	}
	$("#"+task_list_id).append(
										"<li class='layui-timeline-item'>"
											+"<a onclick="+"change_display('"+sub_task_content_id+"');><i class='layui-icon layui-timeline-axis'></i></a>"
											+"<div class='layui-timeline-content layui-text' >"
											+	"<div class='layui-timeline-title' id='"+sub_task_id+"'>"
											+		"<span style='color:black'>子项名称：</span>"+tasks[task_label-1].subtasks[sub_task_label-1].name
											+		"<span id='"+face_id+"'></span>"	
											+	"</div>"
											+	"<div id='"+sub_task_content_id+"' style='display:none'>"
											+		"<div class='layui-timeline-title' ><span style='color:black'>开始日期：</span>"+tasks[task_label-1].subtasks[sub_task_label-1].start_date+ "</div>"
											+		"<div class='layui-timeline-title' ><span style='color:black'>截止日期：</span>"+tasks[task_label-1].subtasks[sub_task_label-1].end_date+ "</div>"
											+		"<div class='layui-timeline-title' ><span style='color:black'>完成日期：</span>"+real_end_time+ "</div>"
											+		"<div class='layui-timeline-title'><span style='color:black'>负责人：</span>"+tasks[task_label-1].subtasks[sub_task_label-1].members+'<button style="float:right" class="layui-btn layui-btn-sm" onclick=check_logs("'+tasks[task_label-1].subtasks[sub_task_label-1].subtask_id+'")>子项日志</button></div>'
											+	"</div>"
											+"</div>"
										+"</li>"
	 						   );
}

/*
函数说明：隐藏和显示内容，目前用于把timeline变成下拉列表
参数：被隐藏或显示的内容id
返回：无
*/
function change_display(id)
{
     var target=document.getElementById(id);
      if(target.style.display=="none"){
                target.style.display="block";
      }else{
                target.style.display="none";
    }
}


/*
函数说明：改变子项的完成/未完成状态（哭笑脸的转换）
参数：表情元素的id;是否完成（完成true，未完成false）
返回：无
*/
function change_one_face(id,finished)
{
  //alert(id);
       var target=document.getElementById(id);
	   if(finished==1)
	   {
	   target.innerHTML="<i class='layui-icon' style='float:right;margin-right:30px;font-size: 22px;color: #1E9FFF;'>&#xe60c;</i>";
	   //target.style="font-size: 20px; color: #1E9FFF;margin-right:30px;float:right;";
	   }
	   else
	   {
	   target.innerHTML="<i class='layui-icon' style='float:right;margin-right:30px;font-size: 19px;color: #FF5722;'>&#xe69c;</i>";
	   //target.style="font-size: 19px; color:#FF5722;margin-right:30px;float:right;";
	   }
}

/*
函数说明：改变某个进度条的进度
参数：进度条的id，任务进度（任务进度的完成子项数除以全部子项数）
返回：无
*/
function change_one_bar(task_bar_id,percent)
{
	layui.element.progress(task_bar_id, percent)
}

/*
函数说明：某个任务下所有子项的初始化
参数：任务编号         全局数组：数组sub_task_situation（子项完成为1，未完成为0）
返回：无
*/
function total_sub_task(task_label)
{
	var sub_finish_num=0;
	var percent=0;
       for(var i=0;i<sub_task_num[task_label-1];i++)
	   {
		  var is_finished=tasks[task_label-1].subtasks[i].state;
	      change_one_face('face'+task_label+'-'+(i+1),is_finished);
		  if(is_finished==1)sub_finish_num++;
	   }
	   percent=sub_finish_num/sub_task_num[task_label-1];
	   task_percent.push((percent.toFixed(2)*100)+"%");
}



/*
函数说明：对所有任务的初始化
参数：任务数目
返回：无
*/
function total_task(task_num)
{
		for(var i=1;i<=task_num;i++)
		{
		   total_sub_task(i);
		}
}
//函数说明:为所有任务条设置进度
function set_task_percent()
{
	for(var i=1;i<=task_num;i++)
	{
		document.getElementById("task_bar"+i).innerHTML="<div   class='layui-progress-bar layui-bg-red' lay-percent="+task_percent[i-1]+"></div>";
	}
}
