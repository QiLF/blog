//当前任务导引部分
function goto_subtask_blog(value)
{
	layui.use(['form'], function(){
		var form = layui.form
		,layer = layui.layer
		//跳转到日志发布界面
		layui.element.tabChange('main-tab','personal_blogs');//跳转到日志tab
		layui.element.tabChange('blog_tabs','blog_tabitem2');//跳转到日志tab内的发布tab
		//选中子项日志
		$('#submission_type').prop("checked",true);
		$('#personal_type').prop("checked",false);

		$('#submission_choose').css('display','block');//显示任务子项为显示状态
		//选中当前任务和子项目。明天写。。。2018.2.12 19:42 开车
		//加载任务选择栏
		log_load_task();
		//选中任务
		var target_task=null//用来存储子项目所在的任务
		for(var i=0;i<group_tasks.length;i++)
		{
			if(target_task!=null)
			{
				break;
			}
			for(var j=0;j<group_tasks[i].subtasks.length;j++)
			{
				if(group_tasks[i].subtasks[j].subtask_id==value)
				{
					target_task=group_tasks[i];
					break;
				}
			}
		}
		$("#log_mission").find("option[value="+target_task.name+"]").prop("selected",true);
		//加载特定任务的子项目选择栏
		log_load_subtask(target_task.name);
		//选中子任务
		$("#log_submission").find("option[value="+value+"]").prop("selected",true);
		form.render();
	});
}




//日志发布
	var log_index;

	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  log_index=layedit.build('log_content'); //建立编辑器
	});

     //用于获取富文本编辑器的内容，添加到表单的json数据中，提交
    function onclick_sumit()
    {
//表单验证部分
/////////////////////////////////////////////////////////////////////////////////
            var form_theme=document.forms["log_release_form"]["log_title"].value;
						var form_subtask_id=null;
						//分日志类型对当前子项目id进行赋值
						if(document.forms["log_release_form"]["log_type"].value=="子项日志")
						{
								form_subtask_id=document.forms["log_release_form"]["log_submission"].value;
						}
						else
						{
								form_subtask_id="a_specified_subtask_id_which_lelongs_to_a_super_account_used_to_store_all_users'_logs";
						}

						if(form_theme==""||form_theme==null)
            {
                layer.msg("日志主题不得为空");
                return false;
            }
            if(form_theme.length<5||form_theme.length>32)
            {
                layer.msg("日志主题需为5-32个字符");
                return false;
            }
            if(!isNaN(form_theme))
            {
                layer.msg("日志主题不能为纯数字");
                return false;
            }
            if( filterSqlStr(form_theme))
            {
                layer.msg("日志主题中包含了敏感字符"+sql_str()+",请重新输入！");
                return false;
            }



            var form_content=layui.layedit.getContent(log_index);
						if(form_content==""||form_content==null)
            {
                layer.msg("日志内容不得为空");
                return false;
            }
            if(form_content.length>4096)
            {
                layer.msg("日志内容至多可含4096个字符");
                return false;
            }
            if( filterSqlStr(form_content))
            {
                layer.msg("日志内容中包含了敏感字符"+sql_str()+",请重新输入！");
                return false;
            }
/////////////////////////////////////////////////////////////////////////////////
//表单验证部分结束
			var userName=getCookie("username");

			var temp={"state":"insert_blog","data":{"writer":userName,"subtask_id":form_subtask_id,"name":form_theme,"content":form_content}};
			var str=JSON.stringify(temp);
			//layer.msg(str);
			$(function(){
				$.ajax({
						url: "php/uploadblog.php",
						type: "POST",
						data:{res:str},
						dataType: "json",
						error: function(){
											//layer.msg('Error loading XML document');
										 },
						success: function(data){
										if(data.success=="true"){
																layer.msg("日志发布成功！");
																get_blogs();//刷新博客预览展示部分
																layui.element.tabChange('blog_tabs','blog_tabitem1');//跳转到博客预览
																document.getElementById('log_title').value="";//清空发布模块的博客标题
																layui.layedit.setContent(log_index,"");//清空发布模块的博客内容
															}else{
																	//layer.msg(data.error);
																	if(data.error=="unsigned")
																	{
																		layer.msg("请先登陆！");
																	}
																 }
												} });
						});
    }



	//用于重置富文本编辑器的内容
	function onclick_reset()
    {
            layui.layedit.setContent(log_index,"");
    }








//防sql注入模块
//////////////////////////////////////////////////////////////////////////////////////////
            <!-- 过滤一些敏感字符函数 -->
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
                var str="and,delete,or,exec,insert,select,union,update,count,*,',join";  //去掉了<和>因为富文本编辑器。
                return str;
            }
///////////////////////////////////////////////////////////////////////////////////////////
