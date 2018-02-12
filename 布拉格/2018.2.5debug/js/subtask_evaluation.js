var tasks=window.parent.tasks;
var task_i=window.parent.edit_task_i;
var subtask_i=window.parent.evaluating_subtask_i;
var evaluating_subtask=tasks[task_i].subtasks[subtask_i];


$(document).ready(function(){
	document.getElementById("subtask_name").innerHTML=evaluating_subtask.name;
	document.getElementById("subtask_pic").innerHTML=evaluating_subtask.members;
	//加载半星评分系统
    scoreFun($("#subtask_stars"));
});

function subtask_evaluation_sumit()
{
	var subtask_id=evaluating_subtask.subtask_id;
	var evaluation=document.getElementById('subtask_evaluation').innerHTML;
	var temp={"state":"update_subtask","data":{"subtask_id":subtask_id,"evaluation":evaluation}};
	var str=JSON.stringify(temp);
	$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function()
			{
				layer.msg('Error loading XML document');
			},
			success: function(data)
			{
				if(data.success!="true")
				{
					layer.msg("出错啦");
					close_subframe();
				}
			}
		});
}

function close_subframe()
{
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引  
	parent.layer.close(index);
}