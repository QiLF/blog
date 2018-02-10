var tasks=window.parent.tasks;
var task_i=window.parent.edit_task_i;
var task_num=tasks.length;
var subtask_num=0;
if(tasks[task_i].subtasks!=undefined){
	subtask_num=tasks[task_i].subtasks.length;
	}


$(document).ready(function(){
	evaluation_subframe_init();
	//加载半星评分系统
     scoreFun($("#task_stars"));
	for(var i=1;i<=subtask_num;i++){
	scoreFun($("#subtask_stars"+i));	
	}
});
function evaluation_subframe_init()
{
	//加载任务部分
	document.getElementById("task_name").innerHTML=tasks[task_i].name;
	
	
	//加载子项部分
	for(var i=1;i<=subtask_num;i++){
		var subtask_id='subtask'+i;
		var stars_id='subtask_stars'+i;
		var evaluation_id='subtask_evaluation'+i;
		$("#subtasks_div").append(
								'<div class="layui-row layui-text" style="padding:20px">\
									<div class="layui-col-sm4">\
										<span>子项名称：</span>\
										<span name='+subtask_id+' id='+subtask_id+' class="layui-text" style="text-align:center">'+tasks[task_i].subtasks[i-1].name+'</span>\
									</div>\
									<div class="layui-col-sm4">\
										<div id='+stars_id+'  class="block clearfix" >\
											  <div class="star_score"></div>\
											  <p style="float:left;">您的评分：<span id='+evaluation_id+' class="fenshu"></span> 分</p>\
										</div>\
									</div>\
									<div class="layui-col-sm4"></div>\
								</div>'
								);
	}
}
function evaluation_sumit()
{
	var success_flag=true;//评价成功的标志,只要有任务和子任务评价失败就为false

	var task_evaluation=document.getElementById("task_evaluation").innerHTML;
	var json_task={"state":"update_task","data":{"task_id":tasks[task_i].task_id,"evaluation":task_evaluation}};
	var str=JSON.stringify(json_task);
	//任务ajax
	$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function()
			{
				close_subframe();
				layer.msg('Error loading XML document');
			},
			success: function(data)
			{
				if(data.success!="true")
				{
					success_flag=false;
					layer.msg("出错啦");
					close_subframe();
				}
			}
		});

	//子任务ajax
	for(var i=1;i<=subtask_num;i++)
	{
		var subtask_evaluation_id="subtask_evaluation"+i;
		var subtask_evaluation=document.getElementById(subtask_evaluation_id).innerHTML;
		var json_subtask={"state":"update_subtask","data":{"subtask_id":tasks[task_i].subtasks[i-1].subtask_id,"evaluation":subtask_evaluation}};
		var str=JSON.stringify(json_subtask);
		$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function()
			{
				layer.msg('Error loading XML document');
				close_subframe();
			},
			success: function(data)
			{
				if(data.success!="true")
				{
					success_flag=false;
					layer.msg("出错啦");
					close_subframe();
				}
			}
		});
	}
	//评价操作是否成功的检验
	if(success_flag==true){
		close_subframe();
		layer.msg("评价成功");
	}
}

function close_subframe()
{
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引  
	parent.layer.close(index);
}