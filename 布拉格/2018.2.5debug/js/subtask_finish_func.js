function finish_subtask_func(subtask_id,task_id)
{
  if(subtask_id==null)
  {
    //alert("子项目id为空！")
    return false;
  }
  var now_date=new Date();
  var year_num=now_date.getFullYear();
  var month_num=now_date.getMonth()+1;
  var date_num=now_date.getDate();
  var current_date=year_num+'-'+month_num+'-'+date_num;
  var temp_data={"state":"update_subtask","data":{"subtask_id":subtask_id,"state":1,"progress":1,"real_end_time":current_date}};
  var res=JSON.stringify(temp_data);
  //ajax part
  $.ajax({
      type: "POST",
      dataType: "json",
      url: "php/task.php" ,
      data: {res:res},
      success: function (data) {
        //deal with data from back_end
        if(data.success=="false"){
          //alert the reason for false
          //alert(data.error);
        }
        else {
          layer.msg("子项进度提交成功！");
		  //用于在get_personal_tasks中将选项卡切换回原任务
		  tabchange_id=task_id;
		  tabchange_flag=true;
		  
		  get_personal_tasks(current_group_id);
        }
      },
      error : function() {
        //alert("数据请求异常");
      }
  });
}


function undo_finish_subtask_func(subtask_id,task_id)
{
  if(subtask_id==null)
  {
    //alert("子项目id为空！")
    return false;
  }
  var now_date=new Date();
  var year_num=now_date.getFullYear();
  var month_num=now_date.getMonth()+1;
  var date_num=now_date.getDate();
  var current_date=year_num+'-'+month_num+'-'+date_num;
  var temp_data={"state":"update_subtask","data":{"subtask_id":subtask_id,"state":2,"progress":0,"real_end_time":current_date}};
  var res=JSON.stringify(temp_data);
  //ajax part
  $.ajax({
      type: "POST",
      dataType: "json",
      url: "php/task.php" ,
      data: {res:res},
      success: function (data) {
        //deal with data from back_end
        if(data.success=="false"){
          //alert the reason for false
          //alert(data.error);
        }
        else {
          layer.msg("已将子项设为未完成状态,快去做任务吧！");
		  //用于在get_personal_tasks中将选项卡切换回原任务
		  tabchange_id=task_id;
		  tabchange_flag=true;
		  
		  get_personal_tasks(current_group_id);
        }
      },
      error : function() {
        //alert("数据请求异常");
      }
  });
}