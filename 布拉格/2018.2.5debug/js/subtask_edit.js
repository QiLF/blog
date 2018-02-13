//日志编辑 包括更新和删除
var edit_task_i=0;
var edit_subtask_num=0;//已有任务数
var edit_sub_task_flag=0;//已有任务数+追加任务数
var new_subtask_name=new Array();//追加子任务名
var new_pic=new Array();//追加子任务负责人


//这里的script是用在任务编辑的form上的
layui.use(['form','layedit', 'laydate'], function(){
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

//更新对应的位序的子任务
function update_subtask(subtask_i)
{
	/*{
		"state":"update_subtask",
		"data":{
				"subtask_id":,
				"name":,
				"start_date":,
				"end_date":,
				"progress":,
				"evaluation":,
				"state":,//标记任务是否完成
				"real_end_date":,//子任务实际的完成时间
				"members":[],
			 }

	}*/
	var name=$('input[name="sub_task'+subtask_i+'"]').val();
  //confirm for name
  if(name==""||name==null)///////////////////////////////////////////////////////////////////////////////////2018.2.6 20:08
  {
      layer.msg('子任务'+subtask_i+'的名字不得为空');
      return false;
  }
  if(name.length<5||name.length>32)
  {
      layer.msg('子任务'+subtask_i+'的名字至需为5-32个字符');
      return false;
  }
  if(!isNaN(name))
  {
      layer.msg('子任务'+subtask_i+'的名字不能为纯数字');
      return false;
  }
  if( filterSqlStr(name))
  {
      layer.msg('子任务'+subtask_i+'的名字中包含了敏感字符'+sql_str()+',请重新输入！');
      return false;
  }


	var members=new Array();
	members.push($('select[name="pic'+subtask_i+'"]').val());
  //confirm for member, just consider one worker temporarily
  if(members[0]==""||members[0]==null)
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名不得为空');
      return false;
  }
  if(members[0].length<8||members[0].length>20)
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名需为8-20个字符');
      return false;
  }
  if(!isNaN(members[0]))
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名不能为纯数字');
      return false;
  }
  if( filterSqlStr(members[0]))
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名中包含了敏感字符'+sql_str()+',请重新输入！');
      return ;
  }


	var subtask_id=tasks[edit_task_i].subtasks[subtask_i-1].subtask_id;
	//alert("members："+members);
	var temp={
				"state":"update_subtask",
				"data":{
						"subtask_id":subtask_id,
						"name":name,
						"members":members,
					   }
			 };
	var str=JSON.stringify(temp);
	//alert("修改子任务:请求为"+str);
	$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function(){
								//alert('Error loading XML document');
							 },
			success: function(data){
							if(data.success=="true"){
													memorize_new_subtask(subtask_i);
													display_flag=false;
													fresh_flag=true;
													get_tasks(current_group_id);//提交修改后进行刷新
													layer.msg("修改子任务成功！");
												}else{
														//alert(data.error);
													 }
									}
			});

}
//插入子任务
function insert_subtask(subtask_i)
{
	var name=$('input[name="sub_task'+subtask_i+'"]').val();

  //confirm for name
  if(name.length<5||name.length>32)
  {
      layer.msg('子任务'+subtask_i+'的名字需为5-32个字符');
      return false;
  }
  if(!isNaN(name))
  {
      layer.msg('子任务'+subtask_i+'的名字不能为纯数字');
      return false;
  }
  if( filterSqlStr(name))
  {
      layer.msg('子任务'+subtask_i+'的名字中包含了敏感字符'+sql_str()+',请重新输入！');
      return false;
  }


	var members=new Array();
	members.push($('select[name="pic'+subtask_i+'"]').val());

  //confirm for member, just consider one worker temporarily
  if(members[0].length<5)
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名需为8-20个字符');
      return false;
  }
  if(!isNaN(members[0]))
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名不能为纯数字');
      return false;
  }
  if( filterSqlStr(members[0]))
  {
      layer.msg('输入的执行者'+subtask_i+'的用户名中包含了敏感字符'+sql_str()+',请重新输入！');
      return ;
  }


	//alert("members"+members);
	var temp={
				"state":"insert_subtask",
				"data":{
						"task_id":tasks[edit_task_i].task_id,
						"name":name,
						"start_date":tasks[edit_task_i].start_date,		//此版本还没考虑子任务的起止时间,暂时用任务的起止时间
						"end_date":tasks[edit_task_i].end_date,			//此版本还没考虑子任务的起止时间
						"members":members,
					   }
			 };
	var str=JSON.stringify(temp);
	//alert("插入子任务:请求为"+str);
	$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function(){
								//alert('Error loading XML document');
							 },
			success: function(data){
							if(data.success=="true"){
													memorize_new_subtask(subtask_i);
													display_flag=false;
													fresh_flag=true;
													get_tasks(current_group_id);//提交插入后进行刷新
													layer.msg("追加子任务成功！");
												}else{
														//alert(data.error);
													 }
									}
			});
}


//删除对应位序的子任务
function delete_subtask(subtask_i)
{
	//alert("要删除的子任务是第"+(edit_task_i+1)+"个任务的第"+subtask_i+"个子任务");
	//删除子任务
	var temp={
				"state":"delete_subtask",
				"data":{
						"subtask_id":tasks[edit_task_i].subtasks[subtask_i-1].subtask_id
					   }
			 };
	var str=JSON.stringify(temp);
	//alert("删除子任务:请求为"+str);
	$.ajax({
			url: "php/task.php",
			type: "POST",
			data:{res:str},
			dataType: "json",
			error: function(){
								//alert('Error loading XML document');
							 },
			success: function(data){
							if(data.success=="true"){
													memorize_new_subtask(subtask_i);
													display_flag=false;
													fresh_flag=true;
													get_tasks(current_group_id);//提交删除后进行刷新
													layer.msg("删除子任务成功！");
												}else{
														//alert(data.error);
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
	task_part_init();
	//子任务部分
	subtasks_part_init();
}

//加载子任务部分
function subtasks_part_init()
{
	layui.use(['form', 'layedit', 'laydate'], function(){
	var form = layui.form
	,layer = layui.layer
	,layedit = layui.layedit
	,laydate = layui.laydate;
	//清空
	document.getElementById('submissiondiv').innerHTML="";
	if(tasks[edit_task_i].subtasks!=undefined)
	{  //判断后端返回数据是否含有属性subtasks
		edit_subtask_num=tasks[edit_task_i].subtasks.length;
	}else
	{
		edit_subtask_num=0;
	}
	edit_sub_task_flag=0;
	//get_tasks();//获取tasks相关信息
	for(var i=1;i<=edit_subtask_num;i++)
	{
		//alert("i="+i);
		edit_add_subtask();
		$('input[name="sub_task'+i+'"]').val(tasks[edit_task_i].subtasks[i-1].name);
		$('select[name="pic'+i+'"]').find('option[value="'+tasks[edit_task_i].subtasks[i-1].members+'"]').attr("selected",true);
	}
	form.render();
	});
}

//写入一项子任务及负责人输入框
function edit_add_subtask()
{	
	layui.use(['form', 'layedit', 'laydate'], function(){
	var form = layui.form
	,layer = layui.layer
	,layedit = layui.layedit
	,laydate = layui.laydate;
	/////////////////////////
	if(edit_sub_task_flag<9)
	{
		edit_sub_task_flag++;
		var addelem='';
		var init_member_elem='';
		for(var temp_j=0;temp_j<current_members.length;temp_j++)
		{
			init_member_elem+='<option value="'+current_members[temp_j]+'">'+current_members[temp_j]+'</option>';	
		}
		if(edit_sub_task_flag<=edit_subtask_num)
		{
			addelem=' <div class="layui-form-item layui-fluid" id="submisdiv'+edit_sub_task_flag+'">\
							<div class="layui-col-sm4">\
							  <label class="layui-form-label">子项'+edit_sub_task_flag+'</label>\
							  <div class="layui-input-block">\
								<input name="sub_task'+edit_sub_task_flag+'" class="layui-input" type="text" placeholder="请输入子项目" autocomplete="off">\
							  </div>\
							</div>\
							<div class="layui-col-sm4">\
							  <label class="layui-form-label">执行者</label>\
							  <div class="layui-input-block">\
							   <select name="pic'+edit_sub_task_flag+'"><option value="">请选择执行者</option>'+init_member_elem+'</select>\
							  </div>\
							</div>\
							<div class="layui-col-sm4">'
							+	'<button type="button" onclick="update_subtask('+edit_sub_task_flag+')" class="layui-btn" style="margin-left:15px">修改</button>'
							+	'<button type="button" onclick="delete_subtask('+edit_sub_task_flag+')" class="layui-btn layui-btn-danger">删除</button>\
							</div>\
					  </div>';
		}
		else
		{
			addelem=' <div class="layui-form-item layui-fluid" id="submisdiv'+edit_sub_task_flag+'">\
							<div class="layui-col-sm4">\
							  <label class="layui-form-label">子项'+edit_sub_task_flag+'</label>\
							  <div class="layui-input-block">\
								<input name="sub_task'+edit_sub_task_flag+'" class="layui-input" type="text" placeholder="请输入子项目" autocomplete="off">\
							  </div>\
							</div>\
							<div class="layui-col-sm4">\
							  <label class="layui-form-label">执行者</label>\
							  <div class="layui-input-block">\
							   <select name="pic'+edit_sub_task_flag+'"><option value="">请选择执行者</option>'+init_member_elem+'</select>\
							  </div>\
							</div>\
							<div class="layui-col-sm4">'
							+	'<button type="button" onclick="insert_subtask('+edit_sub_task_flag+')" class="layui-btn layui-btn-danger" style="margin-left:15px">追加</button>\
							</div>\
					  </div>';
		}
		$("#submissiondiv").append(addelem);
		form.render();
	   }
	else
	{
		layer.msg("子项目数目已经达到上限");
	}
	//////////////
	});
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

//保留用户追加但未提交的子任务内容
function memorize_new_subtask(skip_i)
{
	for(var i=edit_subtask_num+1;i<=edit_sub_task_flag;i++)
	{
		if(i==skip_i){
			continue;
		}//跳过被追加的子项,无需记忆
		var name=$('input[name="sub_task'+i+'"]').val();
		var pic=$('select[name="pic'+i+'"]').val();
		new_subtask_name.push(name);
		new_pic.push(pic);
	}
	//alert(new_subtask_name);
	//alert(new_pic);
}
//用于编辑页面的子任务部分刷新后将未提交的子任务内容还原
function renew_subtasks()
{
	layui.use(['form', 'layedit', 'laydate'], function(){
	var form = layui.form
	,layer = layui.layer
	,layedit = layui.layedit
	,laydate = layui.laydate;
	/////////////////////////
	var num=new_subtask_name.length;
	for(var i=0;i<num;i++)
	{
		edit_add_subtask();
		$('input[name="sub_task'+edit_sub_task_flag+'"]').val(new_subtask_name[i]);
		$('select[name="pic'+edit_sub_task_flag+'"]').find('option[value="'+new_pic[i]+'"]').attr("selected",true);
	}
	new_pic.splice(0,new_pic.length);
	new_subtask_name.splice(0,new_subtask_name.length);
	form.render();
	//////////////
	});
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
