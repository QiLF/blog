var task_progress=
{
	"task":[{
				"task_name":"任务一",
				"task_collaborator":["Danny","Jenny","LiMing","HaiMianBaoBao","PaiDaXing"],
				"task_description":"这是第一个任务",
				"sub_task":[{
								"sub_task_name":"子项1-1",
								"sub_task_description":"子项1-1的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-22",
								"sub_task_pic":"Danny",
								"sub_task_situation":false
							},{
								"sub_task_name":"子项1-2",
								"sub_task_description":"子项1-2的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"Jenny",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项1-3",
								"sub_task_description":"子项1-3的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"LiMing",
								"sub_task_situation":false
							},{
								"sub_task_name":"子项1-4",
								"sub_task_description":"子项1-4的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"HaiMianBaoBao",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项1-5",
								"sub_task_description":"子项1-5的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"PaiDaXing",
								"sub_task_situation":false
							}]
			},{
				"task_name":"任务二",
				"task_collaborator":["Danny","Jenny","LiMing","HaiMianBaoBao","PaiDaXing"],
				"task_description":"这是第二个任务",
				"sub_task":[{
								"sub_task_name":"子项2-1",
								"sub_task_description":"子项2-1的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-22",
								"sub_task_pic":"Danny",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项2-2",
								"sub_task_description":"子项2-2的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"Jenny",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项2-3",
								"sub_task_description":"子项2-3的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"LiMing",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项2-4",
								"sub_task_description":"子项2-4的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"HaiMianBaoBao",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项2-5",
								"sub_task_description":"子项2-5的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"PaiDaXing",
								"sub_task_situation":false
							}]
			},{
				"task_name":"任务三",
				"task_collaborator":["Danny","Jenny","LiMing","HaiMianBaoBao","PaiDaXing"],
				"task_description":"这是第三个任务",
				"sub_task":[{
								"sub_task_name":"子项3-1",
								"sub_task_description":"子项3-1的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-22",
								"sub_task_pic":"Danny",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项3-2",
								"sub_task_description":"子项3-2的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"Jenny",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项3-3",
								"sub_task_description":"子项3-3的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"LiMing",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项3-4",
								"sub_task_description":"子项3-4的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"HaiMianBaoBao",
								"sub_task_situation":true
							},{
								"sub_task_name":"子项3-5",
								"sub_task_description":"子项3-5的描述",
								"sub_task_start_time":"2018-1-21",
								"sub_task_end_time":"2018-1-21",
								"sub_task_pic":"PaiDaXing",
								"sub_task_situation":false
							}]
			}]
};

var task_num=task_progress.task.length;
var sub_task_num=new Array();
for(var i=0;i<task_num;i++)
{
	sub_task_num[i]=task_progress.task[i].sub_task.length;
}
/*
函数说明：初始化任务选项卡模块
参数：
返回：无
*/
$(document).ready(function(){
	 
 //请求本地json文件数据
 //$.getJSON('taskprogress.json');
   init_tab(task_num);
});


/*
函数说明：初始化任务进度选项卡模块
参数：任务数目
返回：无
*/
function init_tab(task_num)
{
	for(var i=1;i<=task_num;i++)
	{
		//alert(i);
		add_tab_item(i);
	}
}


/*
函数说明：添加选项卡的一个标题及对应内容
参数：任务编号
返回：无
*/
function add_tab_item(task_label)
{
		if(task_label===1)
	{
		$("#task_part").append("<div class='layui-tab-item layui-show ' id='task"+task_label+"'></div>");
	}
	else
	{
		$("#task_part").append("<div class='layui-tab-item ' id='task"+task_label+"'></div>");
	}
	//$("#task_part").append("<div class='layui-tab-item ' id='task"+task_label+"'></div>");
	add_tab_title(task_label);
	add_tab_item_content(task_label);
}


/*
函数说明：添加选项卡的标题
参数：任务编号             
返回：无
*/
function add_tab_title(task_label)
{
	if(task_label===1)
	{
		$("#tab_title").append("<li class='layui-this'>"+task_progress.task[task_label-1].task_name+"</li>");
	}
	else
	{
		$("#tab_title").append("<li>"+task_progress.task[task_label-1].task_name+"</li>");
	}
}


/*
函数说明：添加选项卡的内容
参数：任务编号
返回：无
*/
function add_tab_item_content(task_label)
{
	
	var tab_item_id="task"+task_label;
	var task_description_id="task"+task_label+"_description";
	$("#task"+task_label).append(
								 "<div style='position:relative;float:none'>"
								+	"<a onclick="+"change_display('"+task_description_id+"');>"
								+		"<i class='layui-icon' style='font-size: 30px; color: #1E9FFF;'>&#xe63c;</i><span>任务简介</span>"
								+	"</a>"
								+	"<div class=' layui-text' id='task"+task_label+"_description' style='display:none;'>"
								+		"<div class='layui-timeline-title' >"+task_progress.task[task_label-1].task_description+"</div>"  
								+		"<div class='layui-timeline-title' >"
								+       	"<i class='layui-icon' style='font-size: 30px; color: #FF5722;'>&#xe756;</i>"
								+			"参与成员："+task_progress.task[task_label-1].task_collaborator
								+		"</div>"								
								+ 	"</div>"
								+"</div>"
								);
								
	add_progress_bar(task_label,"100%");
	
	$("#task"+task_label).append(
								 "<div class='layui-field-box' style='position:relative;'>"
										+"<p style='float:left;'>任务进展</p>     <p style='float:right;'>完成情况</p>"
										+"<br/>"
								+"</div>"
								);
	add_total_sub_task(task_label,sub_task_num[task_label-1]);
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
	$("#"+task_list_id).append(
										"<li class='layui-timeline-item'>"
											+"<a onclick="+"change_display('"+sub_task_content_id+"');><i class='layui-icon layui-timeline-axis'></i></a>"	
											+"<div class='layui-timeline-content layui-text' >"
											+	"<span class='layui-timeline-title' id='"+sub_task_id+"'>"+task_progress.task[task_label-1].sub_task[sub_task_label-1].sub_task_name+"</span>"
											+	"<i id='"+face_id+"' class='layui-icon' style='font-size: 20px; color: #1E9FFF;float:right'>&#xe60c;</i>"			
											+	"<div id='"+sub_task_content_id+"' style='display:none'>"
											+		"<div class='layui-timeline-title' >内容简介："+task_progress.task[task_label-1].sub_task[sub_task_label-1].sub_task_description+ "</div>"
											+		"<div class='layui-timeline-title' >开始时间："+task_progress.task[task_label-1].sub_task[sub_task_label-1].sub_task_start_time+ "</div>"
											+		"<div class='layui-timeline-title' >完成时间："+task_progress.task[task_label-1].sub_task[sub_task_label-1].sub_task_end_time+ "</div>"
											+		"<div class='layui-timeline-title'>负责人："+task_progress.task[task_label-1].sub_task[sub_task_label-1].sub_task_pic+"</div>"
											+	"</div>"
											+"</div>"
										+"</li>"
	 						   );
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
	   if(finished==true)
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
		  var is_finished=task_progress.task[task_label-1].sub_task[i].sub_task_situation;
	      change_one_face('face'+task_label+'-'+(i+1),is_finished);
		  if(is_finished==true)sub_finish_num++;
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