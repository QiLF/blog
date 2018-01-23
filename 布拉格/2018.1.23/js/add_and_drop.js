
flag=3;
function add_file() 
{  
   if(flag<9)
   {
	flag++;
	var addelem=' <div class="layui-form-item layui-fluid" id="submisdiv'+flag+'">\
				<div class="layui-col-sm1"></div>\
		                <div class="layui-col-sm5">\
		                  <label class="layui-form-label">子项'+flag+'</label>\
		                  <div class="layui-input-block">\
		                    <input name="sub_task'+flag+'" class="layui-input" type="text" placeholder="请输入子项目" autocomplete="off" lay-verify="required">\
		                  </div>\
		                </div>\
		                <div class="layui-col-sm5">\
		                  <label class="layui-form-label">执行者</label>\
		                  <div class="layui-input-block">\
		                   <input name="pic'+flag+'" class="layui-input" type="text" placeholder="请输入执行者" autocomplete="off" lay-verify="required">\
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
   if(flag>1)
   {
		$("#submisdiv"+flag).remove();
		flag--;
   }
   else
   {
		alert("子项目数目不能为空");
   }
}


