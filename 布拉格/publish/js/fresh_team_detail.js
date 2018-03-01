  function fresh_team_info(value)
  {
	//初始化flag
	display_flag=true;
	fresh_flag=false;
	if(task_edit_state==true)
	{
		layer.msg('请退出任务编辑状态再切换团队！');
		return false;
	}
    if(value!=null)
    {
      current_group_id=value;
      var temp_data={"state":"esearch_group","data":{"group_id":value}};
      var res=JSON.stringify(temp_data);
      //ajax part
      $.ajax({
          type: "POST",
          dataType: "json",
          url:"php/group_search.php",
          data: {res:res},
          success: function (data) {
            //deal with data from back_end
            if(data.success == "false"){
              //layer.msg the reason for false
              layer.msg(data.error);
            }
            else {
			        team_info_load(data);//加载页面需要显示的团队信息，包括信息修改模块的
              team_member_load(data);//加载团队成员以便显示和管理.
              get_tasks(value);//选择团队后调用检索任务的函数，以当前团队的id为参数
            }
          },
          error : function() {
            layer.msg("数据请求异常");
          }
        });
      }

      //用以删除团队后拿null来刷新页面团队信息内容
      else
      {
		     team_info_load(null);
         team_member_load(null);
         get_tasks('I guess no group id like this');//use a id that not exist to fresh task info.
      }
  }
