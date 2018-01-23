
sub_task_flag=3;
function add_file() 
{  
   if(sub_task_flag<9)
   {
	sub_task_flag++;
	var addelem=' <div class="layui-form-item layui-fluid" id="submisdiv'+sub_task_flag+'">\
				<div class="layui-col-sm1"></div>\
		                <div class="layui-col-sm5">\
		                  <label class="layui-form-label">子项'+sub_task_flag+'</label>\
		                  <div class="layui-input-block">\
		                    <input name="sub_task'+sub_task_flag+'" class="layui-input" type="text" placeholder="请输入子项目" autocomplete="off">\
		                  </div>\
		                </div>\
		                <div class="layui-col-sm5">\
		                  <label class="layui-form-label">执行者</label>\
		                  <div class="layui-input-block">\
		                   <input name="pic'+sub_task_flag+'" class="layui-input" type="text" placeholder="请输入执行者" autocomplete="off">\
		                  </div>\
		                </div>\
		                <div class="layui-col-sm1"></div>\
		          </div>';

	 $("#submissiondiv").append(addelem);
   }
   else
   {
	alert("子项目数目已经达到上限");
   }
}

function drop_file()
{
   if(sub_task_flag>1)
   {
		$("#submisdiv"+sub_task_flag).remove();
		sub_task_flag--;
   }
   else
   {
		alert("子项目数目不能为空");
   }
}


