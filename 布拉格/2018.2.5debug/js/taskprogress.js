var task_num;
var sub_task_num=new Array();

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
	if(task_num>0){
		layui.element.tabChange('taskprogress-tab', tasks[0].task_id);
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
				+	"<div class='layui-text' >任务名称:"+tasks[task_label-1].name+"</div>" 
				+	"<a onclick="+"change_display('"+task_description_id+"');>"
				+		"<i class='layui-icon' style='font-size: 30px; color: #1E9FFF;'>&#xe63c;</i><span>任务详情</span>"
				+	"</a>"
				+	"<div class=' layui-text' id='task"+task_label+"_description' style='display:none;'>"
				+		"<div class='layui-timeline-title' >任务简介:"+tasks[task_label-1].introduction+"</div>"  
				+		"<div class='layui-timeline-title' >开始日期:"+tasks[task_label-1].start_date+"  截止日期:"+tasks[task_label-1].end_date+"</div>" 
				+		"<div class='layui-timeline-title' >优先级:"+priority[tasks[task_label-1].priority-1]+"</div>"  
				+		"<div class='layui-timeline-title' >"
				+       	"<i class='layui-icon' style='font-size: 30px; color: #FF5722;'>&#xe756;</i>"
				+			"参与成员："+tasks[task_label-1].members
				+		"</div>"
				+ 	"</div>"
			    +  "<div id='"+other_content_id+"'</div>"
				+"</div>";
	layui.element.tabAdd('taskprogress-tab', 
						 {
								title: '任务'+task_label
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
	var real_end_date;
	if(tasks[task_label-1].subtasks[sub_task_label-1].real_end_date==undefined){
		real_end_date="尚未完成";
	}else{
		real_end_date=tasks[task_label-1].subtasks[sub_task_label-1].real_end_date;
	}
	$("#"+task_list_id).append(
										"<li class='layui-timeline-item'>"
											+"<a onclick="+"change_display('"+sub_task_content_id+"');><i class='layui-icon layui-timeline-axis'></i></a>"	
											+"<div class='layui-timeline-content layui-text' >"
											+	"<span class='layui-timeline-title' id='"+sub_task_id+"'>子项"+sub_task_label+"</span>"
											+	"<i id='"+face_id+"' class='layui-icon' style='font-size: 20px;margin-right:20px; color: #1E9FFF;float:right'>&#xe60c;</i>"			
											+	"<div id='"+sub_task_content_id+"' style='display:none'>"
											+		"<div class='layui-timeline-title' >子项名称："+tasks[task_label-1].subtasks[sub_task_label-1].name+"</div>"
											+		"<div class='layui-timeline-title' >开始日期："+tasks[task_label-1].subtasks[sub_task_label-1].start_date+ "</div>"
											+		"<div class='layui-timeline-title' >截止日期："+tasks[task_label-1].subtasks[sub_task_label-1].end_date+ "</div>"
											+		"<div class='layui-timeline-title' >完成日期："+real_end_date+ "</div>"
											+		"<div class='layui-timeline-title'>负责人："+tasks[task_label-1].subtasks[sub_task_label-1].members+"</div>"
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
	   target.innerHTML="&#xe60c;";
	   target.style="font-size: 20px; color: #1E9FFF;float:right;";
	   }
	   else
	   {
	   target.innerHTML="&#xe69c;";
	   target.style="font-size: 19px; color:#FF5722;float:right;";
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
	change_one_bar("task_bar"+task_label,(percent*100)+"%");
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
