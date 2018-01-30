//日志编辑 包括更新和删除
var edit_task_i=0;
var edit_subtask_num=0;//已有任务数
var edit_sub_task_flag=0;//已有任务数+追加任务数

//这里的script是用在任务发布的form上的
layui.use(['layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  //日期
  laydate.render({
    elem: '#task_start_date'
  });
  laydate.render({
    elem: '#task_end_date'
  });
});

//编辑按钮被点击，触发编辑事件
function edit_form_edit(task_i)
{
	one_button_change("form_edit");
	one_button_change("return");
	one_button_change("form_undo");
	one_button_change("form_delete");
	change_display('task_show');
	change_display('task_edit');
}
//取消按钮被点击，返回预览
function edit_form_undo()
{
	one_button_change("form_undo");
	one_button_change("form_delete");
	one_button_change("form_edit");
	one_button_change("return");
	change_display('task_show');
	change_display('task_edit');
}
/*
{
    "state":"update_task",
    "data":{
        "task_id":,
        "name":,
        "introduction":,
        "start_date":,
        "end_date":,
        "priority":,
        "evaluation":,
        "state":,//任务是否完成
        "members":[],
        "real_end_date":
    }
}*/
//提交按钮被点击，提交对任务信息的修改并刷新
function edit_form_sumit()
{
			var temp={"state":"update_task","data":{"task_id":task_id[edit_task_i],"name":form_theme,"content":form_content}};
			var str=JSON.stringify(temp);
			alert("提交修改请求的json："+str);
			$(function(){
				$.ajax({
						url: "php/task.php",  
						type: "POST",
						data:{res:str},
						dataType: "json",
						error: function(){
											alert('Error loading XML document');
										 },
						success: function(data){
										if(data.success=="true"){
																alert("操作成功！");
															}else{
																	alert(data.error);
																 }
												} });
										get_tasks();//提交修改后进行刷新
										$("#form_undo").click();
										$("#return").click();
						});
}

//删除按钮被点击，提交删除请求并刷新
function task_delete()
{
	var temp={"state":"delete_task","data":{"task_id":task_id[edit_task_i]}};
	var str=JSON.stringify(temp);
	alert("提交删除请求的json："+str);
	/*
	$(function(){
				$.ajax({
						url: "php/uploadtask.php",
						type: "POST",
						data:{res:str},
						dataType: "json",
						error: function(){
											alert('Error loading XML document');
										 },
						success: function(data){
										if(data.success=="true"){
																alert("操作成功！");
															}else{
																	alert(data.error);
																 }
												} });
										get_tasks();//提交删除后进行刷新
										$("#form_undo").click();
										$("#return").click();
						});
	*/
	$("#form_undo").click();
	$("#return").click();
}

//更新对应的位序的子任务
function update_subtask(subtask_i)
{

}
//删除对应位序的子任务
function delete_subtask(subtask_i)
{
	alert("要删除的子任务是第"+edit_task_i+"个任务的第"+subtask_i+"个子任务");
	//删除子任务
	var temp={
				"state":"delete_subtask",
				"data":{
						"subtask_id":tasks[edit_task_i].subtasks[subtask_i-1].subtask_id
					   }
			 };
	var str=JSON.stringify(temp);
	alert("删除子任务:请求为"+str);
	$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function(){
								alert('Error loading XML document');
							 },
			success: function(data){
							if(data.success=="true"){
													alert("删除子任务成功！");
													get_tasks();//提交删除后进行刷新
													subtasks_part_init()//重新加载子任务部分
												}else{
														alert(data.error);
													 }
									}
			});

			//$("#form_undo").click();
			//$("#return").click();

}
//加载编辑任务页面的任务和子任务
function edit_form_init()
{
//任务部分
	$('#task_edit_title').val(tasks[edit_task_i].name);
	$('#task_start_date').val(tasks[edit_task_i].start_date);
	$('#task_end_date').val(tasks[edit_task_i].end_date);
	//子任务部分
	subtasks_part_init();
}

//加载子任务部分
function subtasks_part_init()
{
	document.getElementById('submissiondiv').innerHTML="";
	edit_subtask_num=tasks[edit_task_i].subtasks.length;
	edit_sub_task_flag=0;
	get_tasks();//获取tasks相关信息
	for(var i=1;i<=edit_subtask_num;i++)
	{
		//alert("i="+i);
		edit_add_subtask();
		$('input[name="sub_task'+i+'"]').val(tasks[edit_task_i].subtasks[i-1].name);
		$('input[name="pic'+i+'"]').val(tasks[edit_task_i].subtasks[i-1].members);
	}
}


//写入一项子任务及负责人输入框
function edit_add_subtask()
{
   if(edit_sub_task_flag<9)
   {
	edit_sub_task_flag++;
	var addelem=' <div class="layui-form-item layui-fluid" id="submisdiv'+edit_sub_task_flag+'">\
		                <div class="layui-col-sm4">\
		                  <label class="layui-form-label">子项'+edit_sub_task_flag+'</label>\
		                  <div class="layui-input-block">\
		                    <input name="sub_task'+edit_sub_task_flag+'" class="layui-input" type="text" placeholder="请输入子项目" autocomplete="off">\
		                  </div>\
		                </div>\
		                <div class="layui-col-sm4">\
		                  <label class="layui-form-label">执行者</label>\
		                  <div class="layui-input-block">\
		                   <input name="pic'+edit_sub_task_flag+'" class="layui-input" type="text" placeholder="请输入执行者" autocomplete="off">\
		                  </div>\
		                </div>\
		                <div class="layui-col-sm4">'
						+	'<button onclick="update_subtask('+edit_sub_task_flag+')" class="layui-btn" style="margin-left:15px">编辑</button>'
						+	'<button onclick="delete_subtask('+edit_sub_task_flag+')" class="layui-btn layui-btn-danger">删除</button>\
						</div>\
		          </div>';

	 $("#submissiondiv").append(addelem);
   }
   else
   {
	alert("子项目数目已经达到上限");
   }
}
//删除一项新增的子任务及负责人输入框（只有子任务数超过原有子任务数才生效）
function edit_drop_subtask()
{
   if(edit_sub_task_flag>edit_subtask_num)
   {
		$("#submisdiv"+edit_sub_task_flag).remove();
		edit_sub_task_flag--;
   }
}
