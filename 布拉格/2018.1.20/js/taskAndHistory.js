

//自己定义全局变量代替后端参数
	//任务名称   一维数组
	var task_name=new Array("a","b","c");
	//任务数量   整数
	var task_num=task_name.length;
	//任务简介   一维数组
	var task_description=new Array("这是一个任务aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","这真的是一个任务","他们俩说的对");
	//任务参与成员
	var task_collaborator=new Array();
	for(var i=0;i<task_num;i++)
	{
		task_collaborator[i]=new Array("Danny","Jenny","LiMing","HaiMianBaoBao","PaiDaXing");
	}
	//子项完成情况   二维数组
	var sub_task_situation=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_situation[i]=new Array(false,true,true,false,false);
	}
	//子项名称    二维数组
	var sub_task_name=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_name[i]=new Array("子项"+(i+1)+"-1","子项"+(i+1)+"-2","子项"+(i+1)+"-3","子项"+(i+1)+"-4","子项"+(i+1)+"-5");
	}
	//子项开始时间    二维数组
	var sub_task_start_time=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_start_time[i]=new Array("2018.1.18","2018.1.19","2018.1.20","2018.1.21","2018.1.22","2018.1.23");
	}
	//子项完成时间   二维数组
	var sub_task_end_time=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_end_time[i]=new Array("2018.1.18","2018.1.19","2018.1.20","2018.1.21","2018.1.22","2018.1.23");
	}
	//子项负责人    二维数组
	var sub_task_pic=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_pic[i]=new Array("Danny","Jenny","LiMing","HaiMianBaoBao","PaiDaXing");
	}
	//子项简介   二维数组
	var sub_task_description=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_description[i]=new Array(
											"这个人很懒，什么也没有留下",
											"这个人比上一个更懒懒，什么也没有留下",
											"懒无止境",
											"没有更懒，只有最懒",
											"懒洋洋"
										  );
	}
	//子项数量   一维数组
	var sub_task_num=new Array();
	for(var i=0;i<task_num;i++)
	{
		sub_task_num[i]=sub_task_name[i].length;
	}
	
	

/*
函数说明：初始化
参数：
返回：无
*/
$(document).ready(function(){
   init_tab("task_part","task",task_num);
   init_tab("task_h_part","task_h",task_num);
});


/*
函数说明：初始化任务选项卡模块
参数：待添加的选项卡模块的id;前缀(当前任务对应task，完成历史对应task_h);任务数目
返回：无
*/
function init_tab(part_id,prefix,task_num)
{
	for(var i=1;i<=task_num;i++)
	{
		add_tab_item(part_id,prefix,i);
	}
}


/*
函数说明：添加选项卡的一个标题及对应内容
参数：待添加的选项卡模块的id;前缀(当前任务对应task，完成历史对应task_h);任务编号
返回：无
*/
function add_tab_item(part_id,prefix,task_label)
{
		if(task_label===1)
	{
		$("#"+part_id).append("<div class='layui-tab-item layui-show ' id='"+prefix+task_label+"'></div>");
	}
	else
	{
		$("#"+part_id).append("<div class='layui-tab-item ' id='"+prefix+task_label+"'></div>");
	}
	add_tab_title(prefix+"_title_part",task_name,task_label);
	add_tab_item_content(prefix,task_label,sub_task_name,task_collaborator);
}


/*
函数说明：添加选项卡的标题
参数：当前任务（或完成历史）标题模块的id;任务名称数组;任务编号             认为任务后端传来的task_name是下标从0开始
返回：无
*/
function add_tab_title(title_part_id,title_array,task_label)
{
	if(task_label===1)
	{
		$("#"+title_part_id).append("<li class='layui-this'>"+title_array[task_label-1]+"</li>");
	}
	else
	{
		$("#"+title_part_id).append("<li>"+title_array[task_label-1]+"</li>");
	}
}


/*
函数说明：添加选项卡的内容
参数：前缀(当前任务对应task，完成历史对应task_h)，任务编号
返回：无
*/
function add_tab_item_content(prefix,task_label,sub_task_name_array,collaborator_array)
{
	
	var tab_item_id=prefix+task_label;
	var task_description_id=prefix+task_label+"_description";
	$("#"+prefix+task_label).append(
								 "<div style='position:relative;float:none'>"
								+	"<a onclick="+"change_display('"+task_description_id+"');>"
								+		"<i class='layui-icon' style='font-size: 30px; color: #1E9FFF;'>&#xe63c;</i><span>任务简介</span>"
								+	"</a>"
								+	"<div class=' layui-text' id='"+prefix+task_label+"_description' style='display:none;'>"
								+		"<div class='layui-timeline-title' >"+task_description[task_label-1]+"</div>"  
								+		"<div class='layui-timeline-title' >"
								+       	"<i class='layui-icon' style='font-size: 30px; color: #FF5722;'>&#xe756;</i>"
								+			"参与成员："+collaborator_array[task_label-1]
								+		"</div>"								
								+ 	"</div>"
								+"</div>"
								);
								
	add_progress_bar(prefix,task_label,"50%");
	
	$("#"+prefix+task_label).append(
								 "<div class='layui-field-box' style='position:relative;'>"
										+"<p style='float:left;'>任务进展</p>     <p style='float:right;'>完成情况</p>"
										+"<br/>"
								+"</div>"
								);
	add_total_sub_task(prefix,task_label,sub_task_name_array[task_label-1].length);
}
/*
函数说明：向任务选项卡的内容中初始化添加子项及其内容
参数：前缀(当前任务对应task，完成历史对应task_h);任务编号;子项数量
返回：无
*/

function add_total_sub_task(prefix,task_label,sub_task_num)
{
	$("#"+prefix+task_label).append("<ul class='layui-timeline' id='"+prefix+"_list"+task_label+"'></ul>");
	for(var i=1;i<=sub_task_num;i++)
	{
		add_one_sub_task(prefix,task_label,i);
	}
	//alert(ok);
}


/*
函数说明：向任务选项卡的内容中添加一个子项及其内容
参数：前缀(当前任务对应task，完成历史对应task_h);任务编号;待添加子项在此任务中的编号
返回：无
*/
function add_one_sub_task(prefix,task_label,sub_task_label)
{
	var sub_task_id="sub_"+prefix+task_label+"-"+sub_task_label;
	var sub_task_content_id="sub_"+prefix+task_label+"-"+sub_task_label+"_content";
	var face_id=prefix+"_face"+task_label+"-"+sub_task_label;
	var task_list_id=prefix+"_list"+task_label;
	$("#"+task_list_id).append(
										"<li class='layui-timeline-item'>"
											+"<a onclick="+"change_display('"+sub_task_content_id+"');><i class='layui-icon layui-timeline-axis'></i></a>"	
											+"<div class='layui-timeline-content layui-text' >"
											+	"<span class='layui-timeline-title' id='"+sub_task_id+"'>"+sub_task_name[task_label-1][sub_task_label-1]+"</span>"
											+	"<i id='"+face_id+"' class='layui-icon' style='font-size: 20px; color: #1E9FFF;float:right'>&#xe60c;</i>"			
											+	"<div id='"+sub_task_content_id+"' style='display:none'>"
											+		"<div class='layui-timeline-title' >内容简介："+sub_task_description[task_label-1][sub_task_label-1]+ "</div>"
											+		"<div class='layui-timeline-title' >开始时间："+sub_task_start_time[task_label-1][sub_task_label-1]+ "</div>"
											+		"<div class='layui-timeline-title' >完成时间："+sub_task_end_time[task_label-1][sub_task_label-1]+ "</div>"
											+		"<div class='layui-timeline-title'>负责人："+sub_task_pic[task_label-1][sub_task_label-1]+"</div>"
											+	"</div>"
											+"</div>"
										+"</li>"
	 						   );
}		



/*
函数说明：向任务选项卡的内容中添加进度条
参数：前缀(当前任务对应task，完成历史对应task_h);任务编号
返回：无
*/
function add_progress_bar(prefix,task_label)
{
	var task_bar_id=prefix+"_bar"+task_label;
	$("#"+prefix+task_label).append(
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
参数：前缀(当前任务对应task，完成历史对应task_h);任务编号 ;任务完成情况数组（子项完成为true，未完成为false）        		
返回：无
*/
function total_sub_task(prefix,task_label,sub_task_situation_array)
//,sub_task_situation)
{
	//var sub_task_situation=new Array(false,true,true,false,false);
	//alert(task_label);
	var sub_finish_num=0;
	var percent=0;
    if(Array.isArray(sub_task_situation_array[task_label-1]))
	{
       for(var i=0;i<sub_task_situation_array[task_label-1].length;i++)
	   {
	      change_one_face(prefix+'_face'+task_label+'-'+(i+1),sub_task_situation_array[task_label-1][i]);
		  if(sub_task_situation_array[task_label-1][i]==true)sub_finish_num++;
	   }
	   percent=sub_finish_num/sub_task_situation_array[task_label-1].length;
    }
	change_one_bar(prefix+"_bar"+task_label,(percent*100)+"%");
}
						   
/*
函数说明：对所有任务的初始化
参数：前缀(当前任务对应task，完成历史对应task_h);任务数目
返回：无
*/
function total_task(prefix,task_num)
{
		for(var i=1;i<=task_num;i++)
		{
		   total_sub_task(prefix,i,sub_task_situation);
		}
}