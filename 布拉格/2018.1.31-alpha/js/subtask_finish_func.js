function finish_subtask_func(value)
{
  if(value==null)
  {
    alert("子项目id为空！")
    return false;
  }
  var now_date=new Date();
  var year_num=now_date.getFullYear();
  var month_num=now_date.getMonth()+1;
  var date_num=now_date.getDate();
  var current_date=year_num+'-'+month_num+'-'+date_num;
  var temp_data={"state":"update_subtask","data":{"subtask_id":value,"state":1,"progress":1,"real_end_time":current_date}};
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
          alert(data.error);
        }
        else {
          alert("子项进度提交成功！");
        }
      },
      error : function() {
        alert("数据请求异常");
      }
  });
}
